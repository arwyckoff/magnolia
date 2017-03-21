using System;
using System.Collections.Generic;

namespace Magnolia.Context.Models
{
    public class Characteristic
    {
        public int Id { get; set; }
        public string Depends { get; set; }
        public int CategoryId { get; set; }
        public string Value { get; set; }
        public int Permutations { get; set; }

        public List<State> States { get; set; }
        public CharacteristicCategory Category { get; set; }

        public Characteristic()
        {
            States = new List<State>();
        }
    }
}
