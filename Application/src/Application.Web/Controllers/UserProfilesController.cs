using Magnolia.Api.Models;
using Magnolia.Context.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Controllers
{
    [Authorize]
    public class UserProfilesController : Controller
    {
        private readonly MagnoliaContext _context;
        private readonly UserManager<MagnoliaUser> _userManager;

        public UserProfilesController(MagnoliaContext context, UserManager<MagnoliaUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [Route("~/api/user/plants")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = _userManager.GetUserId(User);

            var usersPlants = await _context.UserPlants.Include(p => p.Plant)
                                                  .Include(p => p.Plant.Family)
                                                  .Include(p => p.Plant.PlantCharacteristics)
                                                  .Where(p => p.UserId == userId)
                                                  .ToListAsync();

            var userPlantViewModels = new List<UserPlantViewModel>();

            foreach (var userPlant in usersPlants)
            {
                var up = new UserPlantViewModel();
                up.Comment = userPlant.Comment;
                up.Plant = new PlantViewModel()
                {
                    Id = userPlant.Plant.Id,
                    CommonName = userPlant.Plant.CommonName,
                    SecondaryName = userPlant.Plant.SecondaryName ?? "",
                    TertiaryName = userPlant.Plant.TertiaryName ?? "",
                    LatinName = userPlant.Plant.LatinName,
                    Family = new PlantsFamilyViewModel()
                    {
                        CommonName = userPlant.Plant.Family.CommonName,
                        LatinName = userPlant.Plant.Family.LatinName
                    }
                };

                foreach (var characteristic in userPlant.Plant.PlantCharacteristics)
                {
                    var state = await _context.States.Include(s => s.Characteristic)
                                                     .FirstOrDefaultAsync(s => s.Id == characteristic.StateId);
                    up.Plant.Characteristics.Add(new StateViewModel()
                    {
                        Characteristic = state.Characteristic.Value,
                        State = state.Value,
                        Code = state.Code
                    });

                    up.Plant.CharacteristicsHash.Add(state.Code, null);
                }

                userPlantViewModels.Add(up);
            }

            return Ok(userPlantViewModels);
        }

        [Route("~/api/users/{id}/plants")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Get(string id)
        {
            if (!_context.Users.Any(u => u.Id == id))
            {
                return NotFound(id);
            }

            var usersPlants = await _context.UserPlants.Include(p => p.Plant)
                                                  .Include(p => p.Plant.Family)
                                                  .Include(p => p.Plant.PlantCharacteristics)
                                                  .Where(p => p.UserId == id)
                                                  .ToListAsync();

            var usersPlantsViewModels = new List<UserPlantViewModel>();

            foreach (var userPlant in usersPlants)
            {
                var up = new UserPlantViewModel()
                {
                    Comment = userPlant.Comment
                };
                up.Plant = new PlantViewModel()
                {
                    Id = userPlant.Plant.Id,
                    CommonName = userPlant.Plant.CommonName,
                    SecondaryName = userPlant.Plant.SecondaryName ?? "",
                    TertiaryName = userPlant.Plant.TertiaryName ?? "",
                    LatinName = userPlant.Plant.LatinName,
                    Family = new PlantsFamilyViewModel()
                    {
                        CommonName = userPlant.Plant.Family.CommonName,
                        LatinName = userPlant.Plant.Family.LatinName
                    }
                };

                foreach (var characteristic in userPlant.Plant.PlantCharacteristics)
                {
                    var state = await _context.States.Include(s => s.Characteristic)
                                                     .FirstOrDefaultAsync(s => s.Id == characteristic.StateId);

                    up.Plant.Characteristics.Add(new StateViewModel()
                    {
                        Characteristic = state.Characteristic.Value,
                        State = state.Value,
                        Code = state.Code
                    });

                    up.Plant.CharacteristicsHash.Add(state.Code, null);
                }
            }

            return Ok(usersPlantsViewModels);
        }

        [Route("~/api/user/plants")]
        [HttpPost]
        public async Task<IActionResult> PostPlant([FromBody]UserPlantRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var plant = await _context.Plants.FirstOrDefaultAsync(p => p.Id == model.PlantId);

            if (plant == null)
            {
                return NotFound(model.PlantId);
            }

            var userId = _userManager.GetUserId(User);

            _context.UserPlants.Add(new UserPlants()
            {
                Plant = plant,
                UserId = userId,
                Comment = model.Comment
            });

            await _context.SaveChangesAsync();

            return Ok(model);
        }
    }
}
