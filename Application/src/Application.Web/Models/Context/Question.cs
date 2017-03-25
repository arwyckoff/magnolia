using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Context.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public string Order { get; set; }
        public string Category { get; set; }

        public List<QuestionAnswer> Answers { get; set; }
        public List<State> Dependencies { get; set; }
        public List<State> SkipIf { get; set; }

        public Question()
        {
            Answers = new List<QuestionAnswer>();
            Dependencies = new List<State>();
            SkipIf = new List<State>();
        }
    }
}
