using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Models.Api
{
    public class PlantViewModel
    {
        public string CommonName { get; set; }
        public string LatinName { get; set; }
        public PlantsFamilyViewModel Family { get; set; }
        public List<CharacteristicViewModel> Characteristics { get; set; }

        public PlantViewModel()
        {
            Characteristics = new List<CharacteristicViewModel>();
        }
    }
}
