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
            var questions = await _context.Questions.Include(q => q.Answers)
                                                    .Include(q => q.Depends)
                                                    .Include(q => q.SkipIf)
                                                    .ToListAsync();

            var questionViewModels = new Dictionary<string, List<QuestionViewModel>>();

            foreach (var question in questions)
            {
                var q = new QuestionViewModel()
                {
                    Question = question.Value,
                    Category = question.Category,
                    Description = question.Description,
                    SkipIf = question.SkipIfId == null ? "" : _context.QuestionAnswers.FirstOrDefault(a => a.Id == question.SkipIfId).Code,
                    Depends = question.Depends == null ? "" : _context.QuestionAnswers.FirstOrDefault(a => a.Id == question.DependsId).Code
                };

                foreach (var answer in question.Answers)
                {
                    var a = new AnswerViewModel();
                    a.Answer = answer.Value;
                    a.Description = answer.Description;
                    a.Code = answer.Code;
                    a.Apply = answer.ApplyId == 0 ? "" : _context.States.FirstOrDefault(s => s.Id == answer.ApplyId).Code;

                    q.Answers.Add(a);
                }

                if (questionViewModels.Keys.Any(k => k == q.Category))
                {
                    questionViewModels[q.Category].Add(q);
                }
                else
                {
                    questionViewModels.Add(q.Category, new List<QuestionViewModel>() { q });
                }
            }

            return Ok(questionViewModels);
        }
    }
}
