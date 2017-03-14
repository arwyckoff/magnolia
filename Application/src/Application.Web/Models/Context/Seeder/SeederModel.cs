using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Web.Models.Context.Seeder
{
    public class SeederModel
    {
        public List<CharacteristicSeeder> Characteristics { get; set; }
        public List<FamilySeeder> Families { get; set; }
        public List<TreeSeeder> Trees { get; set; }
    }
}
