using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Context.Seeder.Models
{
    public class SeederModel
    {
        public List<CharacteristicSeeder> Characteristics { get; set; }
        public List<FamilySeeder> Families { get; set; }
        public List<GenusSeeder> Genus { get; set; }
        public List<TreeSeeder> Trees { get; set; }
    }
}
