using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Api.Models
{
    public class QuestionViewModel
    {
        public string Question { get; set; }
        public string Order { get; set; }
        public string Category { get; set; }
        public Dictionary<string, object> Depends { get; set; }
        public Dictionary<string, object> SkipIf { get; set; }
        public List<AnswerViewModel> Answers { get; set; }

        public QuestionViewModel()
        {
            Depends = new Dictionary<string, object>();
            SkipIf = new Dictionary<string, object>();
            Answers = new List<AnswerViewModel>();
        }
    }
}
