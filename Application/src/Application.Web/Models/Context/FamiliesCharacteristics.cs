using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Models
{
    public class FamilyCharacteristics
    {
        public int Id { get; set; }
        public int FamilyId { get; set; }
        public int CharacteristicId { get; set; }
        public int StateId { get; set; }

        public Family Family { get; set; }
        public Characteristic Characteristic { get; set; }
        public State State { get; set; }
    }
}
