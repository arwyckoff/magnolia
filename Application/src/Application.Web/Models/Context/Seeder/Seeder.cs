using Magnolia.Models;
using Magnolia.Web.Models.Context.Seeder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Magnolia.Web
{
    public class Seeder
    {
        public static void Seed(string jsonData, IServiceProvider services)
        {
            var model = JsonConvert.DeserializeObject<SeederModel>(jsonData);

            using (var context = services.GetRequiredService<MagnoliaContext>())
            {
                context.Database.EnsureCreated();

                if (!context.Characteristics.Any())
                {
                    foreach (var characteristic in model.Characteristics)
                    {
                        var c = new Characteristic();
                        c.Permutations = characteristic.States.Count();
                        c.Value = characteristic.Value.ToLower();

                        foreach (var state in characteristic.States)
                        {
                            var s = new State();
                            s.Value = state.Value.ToLower();
                            s.Description = state.Description;
                            s.ImageRef = state.ImageRef;
                            s.Code = state.Code;
                            c.States.Add(s);
                        }

                        context.Characteristics.Add(c);
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
                            gc.Characteristic = context.Characteristics.FirstOrDefault(c => c.Id == gc.State.CharactaristicId);
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

                            pc.Characteristic = context.Characteristics.FirstOrDefault(c => c.Id == pc.State.CharactaristicId) ?? throw new Exception("Invalid state code: " + stateCode);

                            p.PlantCharacteristics.Add(pc);
                        }

                        foreach (var st in p.Genus.GenusCharacteristics)
                        {
                            var pc = new PlantCharacteristics();

                            pc.State = context.States.FirstOrDefault(s => s.Id == st.Id) ?? throw new Exception("Invalid state code: " + st);

                            pc.Characteristic = context.Characteristics.FirstOrDefault(c => c.Id == pc.State.CharactaristicId) ?? throw new Exception("Invalid state code: " + st);

                            p.PlantCharacteristics.Add(pc);
                        }

                        context.Plants.Add(p);
                    }
                }

                context.SaveChanges();
            }
        }
    }
}
