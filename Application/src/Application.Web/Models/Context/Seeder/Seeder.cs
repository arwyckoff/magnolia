using Magnolia.Context.Models;
using Magnolia.Context.Seeder.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Magnolia.Context.Seeder
{
    public class Seeder
    {
        public static void Seed(string jsonData, IServiceProvider services)
        {
            var model = JsonConvert.DeserializeObject<SeederModel>(jsonData);

            using (var context = services.GetRequiredService<MagnoliaContext>())
            {
                context.Database.EnsureCreated();

                if (!context.CharacteristicCategories.Any())
                {
                    var seedCategories = model.Characteristics.Select(c => c.Category).Distinct();

                    foreach (var seedCategory in seedCategories)
                    {
                        context.CharacteristicCategories.Add(new CharacteristicCategory()
                        {
                            Value = seedCategory
                        });
                    }
                }

                context.SaveChanges();

                if (!context.Characteristics.Any())
                {
                    foreach (var seedCharacteristic in model.Characteristics)
                    {
                        var characteristic = new Characteristic();
                        characteristic.Permutations = seedCharacteristic.States.Count();
                        characteristic.Value = seedCharacteristic.Value.ToLower();
                        characteristic.Depends = seedCharacteristic.Depends;

                        characteristic.Category = context.CharacteristicCategories.FirstOrDefault(c => c.Value == seedCharacteristic.Category) 
                                                                                       ?? throw new Exception("Category not found: " + seedCharacteristic.Category);

                        foreach (var seedState in seedCharacteristic.States)
                        {
                            var state = new State();
                            state.Value = seedState.Value.ToLower();
                            state.Description = seedState.Description;
                            state.ImageRef = seedState.ImageRef;
                            state.Code = seedState.Code;
                            characteristic.States.Add(state);
                        }

                        context.Characteristics.Add(characteristic);
                    }
                }

                context.SaveChanges();

                if (!context.Families.Any())
                {
                    foreach (var family in model.Families)
                    {
                        context.Families.Add(new Family()
                        {
                            CommonName = family.CommonName,
                            LatinName = family.LatinName
                        });
                    }
                }

                context.SaveChanges();

                if (!context.Genus.Any())
                {
                    foreach (var genus in model.Genus)
                    {
                        var g = new Genus();
                        g.CommonName = genus.CommonName;
                        g.LatinName = genus.LatinName;
                        g.Family = context.Families.FirstOrDefault(f => f.CommonName == genus.FamilyName) ?? throw new Exception("Family name not found " + genus.ToString());

                        foreach (var state in genus.Characteristics)
                        {
                            var gc = new GenusCharacteristics();
                            gc.Genus = g;

                            gc.State = context.States.FirstOrDefault(s => s.Code == state) ?? throw new Exception("State code not found " + state);
                            gc.Characteristic = context.Characteristics.FirstOrDefault(c => c.Id == gc.State.CharacteristicId);
                            g.GenusCharacteristics.Add(gc);
                        }

                        context.Genus.Add(g);
                    }
                }

                context.SaveChanges();

                if (!context.Plants.Any())
                {
                    foreach (var plant in model.Trees)
                    {
                        var p = new Plant();
                        p.CommonName = plant.CommonName;
                        p.SecondaryName = plant.SecondaryName;
                        p.TertiaryName = plant.TertiaryName;
                        p.LatinName = plant.LatinName;
                        p.Family = context.Families.FirstOrDefault(f => f.CommonName == plant.FamilyName) ?? throw new Exception("Family name not found " + plant);
                        p.ImageRef = plant.ImageRef;

                        var g = new StringBuilder().Append(p.LatinName.TakeWhile(c => c != ' ').ToArray()).ToString();
                        p.Genus = context.Genus.Include(gen => gen.GenusCharacteristics)
                                               .FirstOrDefault(gen => gen.LatinName == g) ?? throw new Exception("Genus name not found " + plant);

                        foreach (var stateCode in plant.Characteristics)
                        {
                            var pc = new PlantCharacteristics();

                            pc.State = context.States.FirstOrDefault(s => s.Code == stateCode) ?? throw new Exception("Invalid state code: " + stateCode);

                            pc.Characteristic = context.Characteristics.FirstOrDefault(c => c.Id == pc.State.CharacteristicId) ?? throw new Exception("Invalid state code: " + stateCode);

                            p.PlantCharacteristics.Add(pc);
                        }

                        foreach (var st in p.Genus.GenusCharacteristics)
                        {
                            var pc = new PlantCharacteristics();

                            pc.State = context.States.FirstOrDefault(s => s.Id == st.Id) ?? throw new Exception("Invalid state code: " + st);

                            pc.Characteristic = context.Characteristics.FirstOrDefault(c => c.Id == pc.State.CharacteristicId) ?? throw new Exception("Invalid state code: " + st);

                            p.PlantCharacteristics.Add(pc);
                        }

                        context.Plants.Add(p);
                    }
                }

                context.SaveChanges();

                if (!context.Questions.Any())
                {
                    foreach (var question in model.Questions)
                    {
                        switch(question.Category)
                        {
                            case "LEAF":
                            case "FLOWER":
                            case "FRUIT":
                            case "TWIG":
                            case "BARK":
                                goto MAKE_QUESTION;
                            default:
                                throw new Exception("Category not found! " + question.Category);
                        }

                    MAKE_QUESTION:
                        var q = new Question()
                        {
                            Value = question.Question,
                            Category = question.Category,
                            Description = question.Description,
                            Depends = question.Depends == "" ? null : context.QuestionAnswers.FirstOrDefault(a => a.Code == question.Depends) ?? throw new Exception("Dependency not found! " + question.Depends),
                            SkipIf = question.SkipIf == "" ? null : context.QuestionAnswers.FirstOrDefault(a => a.Code == question.SkipIf) ?? throw new Exception("Skip not found! " + question.SkipIf)
                        };

                        foreach (var answer in question.Answers)
                        {
                            var a = new QuestionAnswer()
                            {
                                Value = answer.Answer,
                                Description = answer.Description,
                                Code = answer.Code,
                                Apply = answer.Apply == "" ? null : context.States.FirstOrDefault(s => s.Code == answer.Apply) ?? throw new Exception("Apply not found! " + answer.Apply)
                            };

                            context.QuestionAnswers.Add(a);
                            q.Answers.Add(a);
                        }

                        context.Questions.Add(q);
                        context.SaveChanges();
                    }
                }

                context.SaveChanges();
            }
        }
    }
}
