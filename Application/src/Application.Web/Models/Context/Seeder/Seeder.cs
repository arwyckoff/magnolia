using Magnolia.Models;
using Magnolia.Web.Models.Context.Seeder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
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
                        c.Value = characteristic.Value;

                        foreach (var state in characteristic.States)
                        {
                            var s = new State();
                            s.Value = state.Value;
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
                        var f = new Family();
                        f.CommonName = family.CommonName;
                        f.LatinName = family.GenusName;

                        foreach (var state in family.Characteristics)
                        {
                            var fc = new FamilyCharacteristics();
                            fc.Family = f;

                            var st = context.States.FirstOrDefault(s => s.Code == state);
                            if (st == null)
                            {
                                throw new Exception("Invalid state code: " + state);
                            }

                            fc.State = st;

                            var ch = context.Characteristics.FirstOrDefault(c => c.Id == st.CharactaristicId);
                            if (ch == null)
                            {
                                throw new Exception("Characteristic not found! " + state);
                            }

                            fc.Characteristic = ch;
                            f.FamilyCharacteristics.Add(fc);
                        }

                        context.Families.Add(f);
                    }
                }

                context.SaveChanges();

                if (!context.Plants.Any())
                {
                    foreach (var plant in model.Trees)
                    {
                        var p = new Plant();
                        p.CommonName = plant.CommonName;
                        var fam = context.Families.Include(f => f.FamilyCharacteristics).FirstOrDefault(f => f.CommonName == plant.FamilyName);
                        if (fam == null)
                        {
                            throw new Exception("Family name not found! " + plant);
                        }
                        p.Family = fam;

                        p.LatinName = plant.LatinName;
                        p.ImageRef = plant.ImageRef;

                        foreach (var stateCode in plant.Characteristics)
                        {
                            var pc = new PlantCharacteristics();
                            var st = context.States.FirstOrDefault(s => s.Code == stateCode);
                            if (st == null)
                            {
                                throw new Exception("Invalid state code: " + stateCode);
                            }
                            pc.State = st;

                            var ch = context.Characteristics.FirstOrDefault(c => c.Id == pc.State.CharactaristicId);
                            if (ch == null)
                            {
                                throw new Exception("Invalid state code: " + stateCode);
                            }
                            pc.Characteristic = ch;

                            p.PlantCharacteristics.Add(pc);
                        }

                        foreach (var st in p.Family.FamilyCharacteristics)
                        {
                            var pc = new PlantCharacteristics();
                            var state = context.States.FirstOrDefault(s => s.Id == st.Id);
                            if (state == null)
                            {
                                throw new Exception("Invalid state code: " + st);
                            }
                            pc.State = state;

                            var ch = context.Characteristics.FirstOrDefault(c => c.Id == pc.State.CharactaristicId);
                            if (ch == null)
                            {
                                throw new Exception("Invalid state code: " + st);
                            }
                            pc.Characteristic = ch;

                            p.PlantCharacteristics.Add(pc);
                        }
                    }
                }

                context.SaveChanges();
            }
        }
    }
}
