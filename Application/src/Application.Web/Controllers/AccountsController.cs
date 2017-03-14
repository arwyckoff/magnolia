using Magnolia.Models;
using Magnolia.Web.Models.Api.Accounts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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
        public IActionResult Authentication()
        {
            return Ok(User.Identity.IsAuthenticated);
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
                return Ok(AccountsResponse.SignInSuccess);
            }

            return BadRequest(AccountsResponse.SignInFailure);
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
                return BadRequest(AccountsResponse.UserNull);
            }

            var signInResult = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, false);

            if (signInResult.Succeeded)
            {
                return Ok(AccountsResponse.SignInSuccess);
            }

            return BadRequest(AccountsResponse.SignInFailure);
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
