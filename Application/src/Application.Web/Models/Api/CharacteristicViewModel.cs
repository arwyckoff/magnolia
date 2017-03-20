using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Api.Models
{
    public class CharacteristicViewModel
    {
        public int Id { get; set; }
        public string Characteristic { get; set; }
        public string Depends { get; set; }
        public int Permutations { get; set; }
        public List<StateViewModel> States { get; set; }

        public CharacteristicViewModel()
        {
            States = new List<StateViewModel>();
        }
    }
}
