using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Context.Seeder.Models
{
    public class QuestionSeeder
    {
        public string Question { get; set; }
        public string Category { get; set; }
        public string Depends { get; set; }
        public string SkipIf { get; set; }
        public string Description { get; set; }
        public List<AnswerSeeder> Answers { get; set; }
    }
}
