using System;
using System.Collections.Generic;
using System.Text;

namespace Magnolia.Models
{
    public class State
    {
        public int Id { get; set; }
        public int CharacteristicId { get; set; }
        public string Value { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public string ImageRef { get; set; }

        public Characteristic Characteristic { get; set; }
    }
}
