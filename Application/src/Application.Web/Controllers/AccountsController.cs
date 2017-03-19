using Application.Web.Models.Api;
using Magnolia.Models;
using Magnolia.Web.Models.Api;
using Magnolia.Web.Models.Api.Accounts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Web.Controllers
{
    [Authorize]
    public class AccountsController : Controller
    {
        private readonly MagnoliaContext _context;
        private readonly UserManager<MagnoliaUser> _userManager;
        private readonly SignInManager<MagnoliaUser> _signInManager;

        public AccountsController(MagnoliaContext context, UserManager<MagnoliaUser> userManager, SignInManager<MagnoliaUser> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [Route("~/api/authentication")]
        [AllowAnonymous]
        [HttpGet]
        public async  Task<IActionResult> Authentication()
        {
            if (User.Identity.IsAuthenticated)
            {
                var user = await _userManager.GetUserAsync(User);
                var userViewModel = new UserViewModel()
                {
                    Id = user.Id,
                    UserName = user.UserName
                };

                var plants = await _context.UserPlants.Include(p => p.Plant)
                                                      .Include(p => p.Plant.PlantCharacteristics)
                                                      .Include(p => p.Plant.Family)
                                                      .Where(p => p.UserId == user.Id)
                                                      .ToListAsync();

                foreach (var userPlant in plants)
                {
                    var userPlantViewModel = new UserPlantViewModel()
                    {
                        Comment = userPlant.Comment
                    };

                    userPlantViewModel.Plant = new PlantViewModel()
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

                    foreach (var plantCharacteristic in userPlant.Plant.PlantCharacteristics)
                    {
                        var state = await _context.States.Include(s => s.Characteristic)
                                                         .FirstOrDefaultAsync(s => s.Id == plantCharacteristic.StateId);

                        if (userPlantViewModel.Plant.Characteristics.Any(c => c.Code == state.Code))
                            continue;

                        userPlantViewModel.Plant.Characteristics.Add(new StateViewModel()
                        {
                            Characteristic = state.Characteristic.Value,
                            State = state.Value,
                            Code = state.Code
                        });

                        userPlantViewModel.Plant.CharacteristicsHash.Add(state.Code, null);
                    }

                    userViewModel.Plants.Add(userPlantViewModel);
                }

                return Ok(userViewModel);
            }

            return Ok(new UserViewModel());
        }

        [Route("~/api/accounts/register")]
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody]RegisterRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new MagnoliaUser()
            {
                Email = model.Email,
                UserName = model.Email
            };

            var identity = await _userManager.CreateAsync(user, model.Password);
            
            if (!identity.Succeeded)
            {
                return BadRequest(identity.Errors);
            }

            var signInResult = await _signInManager.PasswordSignInAsync(user, model.Password, true, false);

            if (signInResult.Succeeded)
            {
                return Ok(model);
            }

            return Unauthorized();
        }

        [Route("~/api/accounts/login")]
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]LoginRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                return NotFound(model);
            }

            var signInResult = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, false);

            if (signInResult.Succeeded)
            {
                return Ok(model);
            }

            return Unauthorized();
        }

        [Route("~/api/accounts/logout")]
        [HttpPut]
        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();
            return Ok(AccountsResponse.SignOutSuccess);
        }
    }
}
