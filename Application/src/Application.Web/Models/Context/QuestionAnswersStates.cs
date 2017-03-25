using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Context.Models
{
    public class QuestionAnswersStates
    {
        public int Id { get; set; }
        public int AnswerId { get; set; }
        public QuestionAnswer Answer { get; set; }

        public int StateId { get; set; }
        public State State { get; set; }
    }
}
