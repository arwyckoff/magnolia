﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Magnolia.Context.Models
{
    public class Plant
    {
        public int Id { get; set; }
        public string CommonName { get; set; }
        public string SecondaryName { get; set; }
        public string TertiaryName { get; set; }
        public string LatinName { get; set; }
        public string Description { get; set; }
        public string ImageRef { get; set; }
        public int GenusId { get; set; }
        public int FamilyId { get; set; }

        public Genus Genus { get; set; }
        public Family Family { get; set; }
        public List<PlantCharacteristics> PlantCharacteristics { get; set; }

        public Plant()
        {
            PlantCharacteristics = new List<PlantCharacteristics>();
        }
    }
}
