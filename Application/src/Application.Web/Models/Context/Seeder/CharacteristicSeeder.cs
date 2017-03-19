using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Context.Seeder.Models
{
    public class CharacteristicSeeder
    {
        public string Value { get; set; }
        public List<StateSeeder> States { get; set; }
    }
}
