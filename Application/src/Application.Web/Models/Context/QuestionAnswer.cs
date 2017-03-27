using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Context.Models
{
    public class QuestionAnswer
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public int QuestionId { get; set; }
        public int ApplyId { get; set; }

        public State Apply { get; set; }
        public Question Question { get; set; }
        public Question Depended { get; set; }
        public Question Skips { get; set; }
    }
}
