using Application.Web.Models.Api;
using Magnolia.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Web.Controllers
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
            var states = await _context.States.Include(s => s.Characteristic)
                                              .ToListAsync();

            var characteristicViewModels = new Dictionary<string, CharacteristicViewModel>();

            foreach (var state in states)
            {
                if (!characteristicViewModels.Keys.Any(k => k == state.Code))
                {
                    characteristicViewModels.Add(state.Code, new CharacteristicViewModel()
                    {
                        Characteristic = state.Characteristic.Value,
                        State = state.Value,
                        Code = state.Code
                    });
                }
            }

            return Ok(characteristicViewModels);
        }

        [Route("~/api/characteristics/{code}")]
        [HttpGet]
        public async Task<IActionResult> Get(string code)
        {
            var state = await _context.States.Include(s => s.Characteristic)
                                             .FirstOrDefaultAsync(s => s.Code == code);

            if (state == null)
            {
                return NotFound(code);
            }

            return Ok(new CharacteristicViewModel()
            {
                Characteristic = state.Characteristic.Value,
                State = state.Value,
                Code = state.Code
            });
        }
    }
}
