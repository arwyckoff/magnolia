using Application.Web.Models.Api;
using Magnolia.Models;
using Magnolia.Web.Models.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Web.Controllers
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
            var plants = await _context.UserPlants.Include(p => p.Plant)
                                                  .Include(p => p.Plant.Family)
                                                  .Include(p => p.Plant.PlantCharacteristics)
                                                  .Where(p => p.UserId == userId)
                                                  .ToListAsync();

            var userPlantViewModels = new List<UserPlantViewModel>();

            foreach (var plant in plants)
            {
                var p = new UserPlantViewModel();
                p.Comment = plant.Comment;
                p.Plant = new PlantViewModel()
                {
                    Id = plant.Plant.Id,
                    CommonName = plant.Plant.CommonName,
                    SecondaryName = plant.Plant.SecondaryName ?? "",
                    TertiaryName = plant.Plant.TertiaryName ?? "",
                    LatinName = plant.Plant.LatinName,
                    Family = new PlantsFamilyViewModel()
                    {
                        CommonName = plant.Plant.Family.CommonName,
                        LatinName = plant.Plant.Family.LatinName
                    }
                };

                foreach (var state in plant.Plant.PlantCharacteristics)
                {
                    var st = await _context.States.Include(s => s.Characteristic)
                                                  .FirstOrDefaultAsync(s => s.Id == state.StateId);
                    p.Plant.Characteristics.Add(new StateViewModel()
                    {
                        Characteristic = st.Characteristic.Value,
                        State = st.Value,
                        Code = st.Code
                    });
                }

                userPlantViewModels.Add(p);
            }

            return Ok(userPlantViewModels);
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
