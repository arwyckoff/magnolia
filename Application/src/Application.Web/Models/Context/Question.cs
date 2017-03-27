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
        public string Category { get; set; }
        public string Description { get; set; }
        public int? DependsId { get; set; }
        public int? SkipIfId { get; set; }

        public List<QuestionAnswer> Answers { get; set; }
        public QuestionAnswer Depends { get; set; }
        public QuestionAnswer SkipIf { get; set; }

        public Question()
        {
            Answers = new List<QuestionAnswer>();
        }
    }
}
