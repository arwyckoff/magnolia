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
            return Ok((await _context.Plants.ToListAsync()));
        }

        [Route("~/api/plants/{id}")]
        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            return Ok((await _context.Plants.FirstOrDefaultAsync(p => p.Id == id)));
        }
    }
}
