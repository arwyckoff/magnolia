using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Models
{
    public class Genus
    {
        public int Id { get; set; }
        public string CommonName { get; set; }
        public string LatinName { get; set; }
        public int FamilyId { get; set; }

        public Family Family { get; set; }
        public List<GenusCharacteristics> GenusCharacteristics { get; set; }

        public Genus()
        {
            GenusCharacteristics = new List<GenusCharacteristics>();
        }
    }
}
