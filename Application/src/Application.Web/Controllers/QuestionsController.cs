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
    public class QuestionsController : Controller
    {
        private readonly MagnoliaContext _context;

        public QuestionsController(MagnoliaContext context)
        {
            _context = context;
        }

        [Route("~/api/questions")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var questionViewModels = await Cache.GetQuestionViewModels(_context);

            return Ok(questionViewModels);
        }
    }
}
