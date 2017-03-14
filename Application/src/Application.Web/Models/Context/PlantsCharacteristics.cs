using System;
using System.Collections.Generic;
using System.Text;

namespace Magnolia.Models
{
    public class PlantCharacteristics
    {
        public int Id { get; set; }
        public int PlantId { get; set; }
        public int StateId { get; set; }
        public int CharacteristicId { get; set; }

        public Plant Plant { get; set; }
        public State State { get; set; }
        public Characteristic Characteristic { get; set; }
    }
}
