using Application.Web.Models.Api;
using Magnolia.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Web.Controllers
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
                var p = new PlantViewModel();
                p.Id = plant.Id;
                p.CommonName = plant.CommonName;
                p.LatinName = plant.LatinName;
                p.Family = new PlantsFamilyViewModel()
                {
                    CommonName = plant.Family.CommonName,
                    LatinName = plant.Family.LatinName
                };

                foreach (var characteristic in plant.PlantCharacteristics)
                {
                    var state = await _context.States.Include(s => s.Charactaristic)
                                                     .FirstOrDefaultAsync(s => s.Id == characteristic.StateId);
                    p.Characteristics.Add(new CharacteristicViewModel()
                    {
                        Characteristic = state.Charactaristic.Value,
                        State = state.Value,
                        Code = state.Code
                    });
                }

                plantViewModels.Add(p);
            }

            return Ok(plantViewModels);
        }

        [Route("~/api/plants/{id}")]
        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            return Ok((await _context.Plants.FirstOrDefaultAsync(p => p.Id == id)));
        }
    }
}
