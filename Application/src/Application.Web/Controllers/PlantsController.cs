using Magnolia.Api.Models;
using Magnolia.Context.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Controllers
{
    public class PlantsController : Controller
    {
        private readonly MagnoliaContext _context;

        public PlantsController(MagnoliaContext context)
        {
            _context = context;
        }

        [Route("~/api/plants")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var plants = await _context.Plants.Include(p => p.PlantCharacteristics)
                                              .Include(p => p.Family)
                                              .ToListAsync();

            var plantViewModels = new List<PlantViewModel>();

            foreach (var plant in plants)
            {
                var plantViewModel = new PlantViewModel()
                {
                    Id = plant.Id,
                    CommonName = plant.CommonName,
                    SecondaryName = plant.SecondaryName ?? "",
                    TertiaryName = plant.TertiaryName ?? "",
                    LatinName = plant.LatinName,
                    Family = new PlantsFamilyViewModel()
                    {
                        CommonName = plant.Family.CommonName,
                        LatinName = plant.Family.LatinName
                    }
                };

                foreach (var characteristic in plant.PlantCharacteristics)
                {
                    var state = await _context.States.Include(s => s.Characteristic)
                                                     .FirstOrDefaultAsync(s => s.Id == characteristic.StateId);

                    if (plantViewModel.Characteristics.Any(c => c.Code == state.Code))
                        continue;

                    plantViewModel.Characteristics.Add(new StateViewModel()
                    {
                        Characteristic = state.Characteristic.Value,
                        State = state.Value,
                        Code = state.Code
                    });

                    plantViewModel.CharacteristicsHash.Add(state.Code, null);
                }

                plantViewModels.Add(plantViewModel);
            }

            return Ok(plantViewModels);
        }

        [Route("~/api/plants/byid/{id}")]
        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            var plant = await _context.Plants.Include(p => p.PlantCharacteristics)
                                             .Include(p => p.Family)
                                             .FirstOrDefaultAsync(p => p.Id == id);

            if (plant == null)
            {
                return NotFound(id);
            }

            var plantViewModel = new PlantViewModel()
            {
                Id = plant.Id,
                CommonName = plant.CommonName,
                SecondaryName = plant.SecondaryName ?? "",
                TertiaryName = plant.TertiaryName ?? "",
                LatinName = plant.LatinName,
                Family = new PlantsFamilyViewModel()
                {
                    CommonName = plant.Family.CommonName,
                    LatinName = plant.Family.LatinName
                }
            };

            foreach (var characteristic in plant.PlantCharacteristics)
            {
                var state = await _context.States.Include(s => s.Characteristic)
                                                 .FirstOrDefaultAsync(s => s.Id == characteristic.StateId);

                if (plantViewModel.Characteristics.Any(c => c.Code == state.Code))
                    continue;

                plantViewModel.Characteristics.Add(new StateViewModel()
                {
                    Characteristic = state.Characteristic.Value,
                    State = state.Value,
                    Code = state.Code
                });

                plantViewModel.CharacteristicsHash.Add(state.Code, null);
            }

            return Ok(plantViewModel);
        }

        [Route("~/api/plants/byname/{latin}")]
        [HttpGet]
        public async Task<IActionResult> GetByLatin(string latin)
        {
            var l = latin.ToLower();
            var plant = await _context.Plants.Include(p => p.Family)
                                             .Include(p => p.PlantCharacteristics)
                                             .FirstOrDefaultAsync(p => p.LatinName.ToLower() == l);

            if (plant == null)
            {
                return NotFound(latin);
            }

            var plantViewModel = new PlantViewModel()
            {
                Id = plant.Id,
                CommonName = plant.CommonName,
                SecondaryName = plant.SecondaryName,
                TertiaryName = plant.TertiaryName,
                LatinName = plant.LatinName,
                Family = new PlantsFamilyViewModel()
                {
                    CommonName = plant.Family.CommonName,
                    LatinName = plant.Family.LatinName
                }
            };

            foreach (var characteristic in plant.PlantCharacteristics)
            {
                var state = await _context.States.Include(s => s.Characteristic)
                                                 .FirstOrDefaultAsync(s => s.Id == characteristic.StateId);

                if (!plantViewModel.Characteristics.Any(c => c.Code == state.Code))
                {
                    plantViewModel.Characteristics.Add(new StateViewModel()
                    {
                        Characteristic = state.Characteristic.Value,
                        State = state.Value,
                        Code = state.Code
                    });

                    plantViewModel.CharacteristicsHash.Add(state.Code, null);
                }
            }

            return Ok(plantViewModel);
        }

        [Route("~/api/plants/withcodes/{codes}")]
        [HttpGet]
        public async Task<IActionResult> Get(string codes)
        {
            if (!codes.ToList().Exists(c => c == ',') && codes.Length > 3)
            {
                ModelState.AddModelError("Codes", "Invalid format; not comma delimited yet longer than one code. ");
                return BadRequest(ModelState);
            }

            var characteristics = codes.Split(',').ToList();

            if (characteristics.Exists(ch => ch.ToList().Exists(c => c < 65 || (c > 90 && c < 97) || c > 122)))
            {
                ModelState.AddModelError("Codes", "Invalid format; codes may only contain letters. ");
                return BadRequest(ModelState);
            }
            else if (characteristics.Exists(ch => !ch.ToList().Exists(c => (c > 64 && c < 91))))
            {
                ModelState.AddModelError("Codes", "Invalid format; codes must have at least one lowercase letter. ");
                return BadRequest(ModelState);
            }
            else if (characteristics.Exists(ch => !ch.ToList().Exists(c => (c > 96 && c < 123))))
            {
                ModelState.AddModelError("Codes", "Invalid format; codes must have at least one uppercase letter. ");
                return BadRequest(ModelState);
            }

            var stateIds = await _context.States.Where(s => characteristics.Exists(c => c == s.Code))
                                                .Select(s => s.Id)
                                                .ToListAsync();

            var plants = await _context.Plants.Include(p => p.PlantCharacteristics)
                                              .Include(p => p.Family)
                                              .Where(p => p.PlantCharacteristics.Select(pc => pc.StateId)
                                                                                .Intersect(stateIds)
                                                                                .Count() == stateIds.Count())
                                              .ToListAsync();

            var plantViewModels = new List<PlantViewModel>();

            foreach (var plant in plants)
            {
                var plantViewModel = new PlantViewModel();
                plantViewModel.Id = plant.Id;
                plantViewModel.CommonName = plant.CommonName;
                plantViewModel.SecondaryName = plant.SecondaryName ?? "";
                plantViewModel.TertiaryName = plant.TertiaryName ?? "";
                plantViewModel.LatinName = plant.LatinName;
                plantViewModel.Family = new PlantsFamilyViewModel()
                {
                    CommonName = plant.Family.CommonName,
                    LatinName = plant.Family.LatinName
                };

                foreach (var characteristic in plant.PlantCharacteristics)
                {
                    var state = await _context.States.Include(s => s.Characteristic)
                                                     .FirstOrDefaultAsync(s => s.Id == characteristic.StateId);

                    if (plantViewModel.Characteristics.Any(c => c.Code == state.Code))
                        continue;

                    plantViewModel.Characteristics.Add(new StateViewModel()
                    {
                        Characteristic = state.Characteristic.Value,
                        State = state.Value,
                        Code = state.Code
                    });

                    plantViewModel.CharacteristicsHash.Add(state.Code, null);
                }

                plantViewModels.Add(plantViewModel);
            }

            return Ok(plantViewModels);
        }

        [Route("~/api/genus/latin/{genus}/plants")]
        [HttpGet]
        public async Task<IActionResult> GetLatinGenus(string genus)
        {
            genus = genus.ToLower();
            var gen = await _context.Genus.FirstOrDefaultAsync(g => g.LatinName.ToLower() == genus);
            if (gen == null)
            {
                return NotFound(genus);
            }

            var genusId = gen.Id;

            var plants = await _context.Plants.Include(p => p.PlantCharacteristics)
                                              .Include(p => p.Family)
                                              .Where(p => p.GenusId == genusId)
                                              .ToListAsync();

            var plantViewModels = new List<PlantViewModel>();

            foreach (var plant in plants)
            {
                var plantViewModel = new PlantViewModel()
                {
                    Id = plant.Id,
                    CommonName = plant.CommonName,
                    SecondaryName = plant.SecondaryName ?? "",
                    TertiaryName = plant.TertiaryName ?? "",
                    LatinName = plant.LatinName,
                    Family = new PlantsFamilyViewModel()
                    {
                        CommonName = plant.Family.CommonName,
                        LatinName = plant.Family.LatinName
                    }
                };

                foreach (var characteristic in plant.PlantCharacteristics)
                {
                    var state = await _context.States.Include(s => s.Characteristic)
                                                     .FirstOrDefaultAsync(s => s.Id == characteristic.StateId);

                    if (plantViewModel.Characteristics.Any(c => c.Code == state.Code))
                        continue;

                    plantViewModel.Characteristics.Add(new StateViewModel()
                    {
                        Characteristic = state.Characteristic.Value,
                        State = state.Value,
                        Code = state.Code
                    });

                    plantViewModel.CharacteristicsHash.Add(state.Code, null);
                }

                plantViewModels.Add(plantViewModel);
            }

            return Ok(plantViewModels);
        }

        [Route("~/api/genus/common/{genus}/plants")]
        [HttpGet]
        public async Task<IActionResult> GetCommonGenus(string genus)
        {
            genus = genus.ToLower();
            var gen = await _context.Genus.FirstOrDefaultAsync(g => g.CommonName.ToLower() == genus);
            if (gen == null)
            {
                return NotFound(genus);
            }

            var genusId = gen.Id;

            var plants = await _context.Plants.Include(p => p.PlantCharacteristics)
                                              .Include(p => p.Family)
                                              .Where(p => p.GenusId == genusId).ToListAsync();

            var plantViewModels = new List<PlantViewModel>();

            foreach (var plant in plants)
            {
                var plantViewModel = new PlantViewModel()
                {
                    Id = plant.Id,
                    CommonName = plant.CommonName,
                    SecondaryName = plant.SecondaryName ?? "",
                    TertiaryName = plant.TertiaryName ?? "",
                    LatinName = plant.LatinName,
                    Family = new PlantsFamilyViewModel()
                    {
                        CommonName = plant.Family.CommonName,
                        LatinName = plant.Family.LatinName
                    }
                };

                foreach (var characteristic in plant.PlantCharacteristics)
                {
                    var state = await _context.States.Include(s => s.Characteristic)
                                                     .FirstOrDefaultAsync(s => s.Id == characteristic.StateId);

                    if (plantViewModel.Characteristics.Any(c => c.Code == state.Code))
                        continue;

                    plantViewModel.Characteristics.Add(new StateViewModel()
                    {
                        Characteristic = state.Characteristic.Value,
                        State = state.Value,
                        Code = state.Code
                    });

                    plantViewModel.CharacteristicsHash.Add(state.Code, null);
                }

                plantViewModels.Add(plantViewModel);
            }

            return Ok(plantViewModels);
        }
    }
}
