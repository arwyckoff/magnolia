using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Api.Models
{
    public class QuestionViewModel
    {
        public string Question { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Characteristic { get; set; }
        public string Depends { get; set; }
        public string SkipIf { get; set; }
        public List<AnswerViewModel> Answers { get; set; }

        public QuestionViewModel()
        {
            Answers = new List<AnswerViewModel>();
            Characteristic = null;
        }
    }
}
