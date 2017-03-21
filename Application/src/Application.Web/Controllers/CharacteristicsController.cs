using Magnolia.Api.Models;
using Magnolia.Context.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Controllers
{
    public class CharacteristicsController : Controller
    {
        private readonly MagnoliaContext _context;

        public CharacteristicsController(MagnoliaContext context)
        {
            _context = context;
        }

        [Route("~/api/characteristics")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var characteristics = await _context.Characteristics.Include(s => s.States)
                                                                .Include(s => s.Category)
                                                                .ToListAsync();

            var characteristicViewModels = new Dictionary<string, List<CharacteristicViewModel>>();

            foreach (var characteristic in characteristics)
            {
                var category = characteristic.Category.Value;
                if (!characteristicViewModels.Keys.Any(k => k == category))
                {
                    characteristicViewModels.Add(category, new List<CharacteristicViewModel>());
                }

                var characteristicViewModel = new CharacteristicViewModel()
                {
                    Id = characteristic.Id,
                    Characteristic = characteristic.Value,
                    Depends = characteristic.Depends,
                    Permutations = characteristic.Permutations
                };

                foreach (var state in characteristic.States)
                {
                    characteristicViewModel.States.Add(new StateViewModel()
                    {
                        Characteristic = characteristic.Value,
                        State = state.Value,
                        Code = state.Code
                    });
                }

                characteristicViewModels[category].Add(characteristicViewModel);
            }

            return Ok(characteristicViewModels);
        }

        [Route("~/api/characteristics/byid/{id}")]
        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            var characteristic = await _context.Characteristics.Include(c => c.States)
                                                               .FirstOrDefaultAsync(c => c.Id == id);

            if (characteristic == null)
            {
                return NotFound(id);
            }

            var characteristicViewModel = new CharacteristicViewModel()
            {
                Id = characteristic.Id,
                Characteristic = characteristic.Value,
                Depends = characteristic.Depends,
                Permutations = characteristic.Permutations
            };

            foreach (var state in characteristic.States)
            {
                characteristicViewModel.States.Add(new StateViewModel()
                {
                    Characteristic = characteristicViewModel.Characteristic,
                    State = state.Value,
                    Code = state.Code
                });
            }

            return Ok(characteristicViewModel);
        }

        [Route("~/api/characteristics/byname/{value}")]
        [HttpGet]
        public async Task<IActionResult> Get(string value)
        {
            var v = value.ToLower();
            var characteristic = await _context.Characteristics.Include(c => c.States)
                                                               .FirstOrDefaultAsync(c => c.Value == v);

            if (characteristic == null)
            {
                return NotFound(value);
            }

            var characteristicViewModel = new CharacteristicViewModel()
            {
                Id = characteristic.Id,
                Characteristic = characteristic.Value,
                Depends = characteristic.Depends,
                Permutations = characteristic.Permutations
            };

            foreach (var state in characteristic.States)
            {
                characteristicViewModel.States.Add(new StateViewModel()
                {
                    Characteristic = characteristicViewModel.Characteristic,
                    State = state.Value,
                    Code = state.Code
                });
            }

            return Ok(characteristicViewModel);
        }

        [Route("~/api/characteristics/codes")]
        [HttpGet]
        public async Task<IActionResult> GetCodes()
        {
            var states = await _context.States.Include(s => s.Characteristic)
                                              .ToListAsync();

            var characteristicViewModels = new Dictionary<string, StateViewModel>();

            foreach (var state in states)
            {
                if (!characteristicViewModels.Keys.Any(k => k == state.Code))
                {
                    characteristicViewModels.Add(state.Code, new StateViewModel()
                    {
                        Characteristic = state.Characteristic.Value,
                        State = state.Value,
                        Code = state.Code
                    });
                }
            }

            return Ok(characteristicViewModels);
        }

        [Route("~/api/characteristics/codes/{code}")]
        [HttpGet]
        public async Task<IActionResult> GetCodes(string code)
        {
            var state = await _context.States.Include(s => s.Characteristic)
                                             .FirstOrDefaultAsync(s => s.Code == code);

            if (state == null)
            {
                return NotFound(code);
            }

            return Ok(new StateViewModel()
            {
                Characteristic = state.Characteristic.Value,
                State = state.Value,
                Code = state.Code
            });
        }
    }
}
