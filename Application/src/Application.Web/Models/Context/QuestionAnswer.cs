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
        
        public List<State> ResultingStates { get; set; }
        public Question Question { get; set; }

        public QuestionAnswer()
        {
            ResultingStates = new List<State>();
        }
    }
}
