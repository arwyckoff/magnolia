using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Api.Models
{
    public class PlantViewModel
    {
        public int Id { get; set; }
        public string CommonName { get; set; }
        public string SecondaryName { get; set; }
        public string TertiaryName { get; set; }
        public string LatinName { get; set; }
        public PlantsFamilyViewModel Family { get; set; }
        public Dictionary<string, object> Characteristics { get; set; }

        public PlantViewModel()
        {
            Characteristics = new Dictionary<string, object>();
        }
    }
}
