using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Context.Models
{
    public class CharacteristicCategory
    {
        public int Id { get; set; }
        public string Value { get; set; }

        public List<Characteristic> Characteristics { get; set; }

        public CharacteristicCategory()
        {
            Characteristics = new List<Characteristic>();
        }
    }
}
