using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Web.Models.Context.Seeder
{
    public class TreeSeeder
    {
        public List<string> Characteristics { get; set; }
        public string CommonName { get; set; }
        public string LatinName { get; set; }
        public string FamilyName { get; set; }
        public string ImageRef { get; set; }
    }
}
