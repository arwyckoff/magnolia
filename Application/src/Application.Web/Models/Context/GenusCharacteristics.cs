using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Context.Models
{
    public class GenusCharacteristics
    {
        public int Id { get; set; }
        public int GenusId { get; set; }
        public int CharacteristicId { get; set; }
        public int StateId { get; set; }

        public Genus Genus { get; set; }
        public Characteristic Characteristic { get; set; }
        public State State { get; set; }
    }
}
