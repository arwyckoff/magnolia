using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Api.Models
{
    public class AnswerViewModel
    {
        public string Answer { get; set; }
        public List<string> StateCodes { get; set; }

        public AnswerViewModel()
        {
            StateCodes = new List<string>();
        }
    }
}
