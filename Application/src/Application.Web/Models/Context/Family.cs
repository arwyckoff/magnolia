﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Context.Models
{
    public class Family
    {
        public int Id { get; set; }
        public string CommonName { get; set; }
        public string LatinName { get; set; }
        
        public List<Plant> Plants { get; set; }

        public Family()
        {
            Plants = new List<Plant>();
        }
    }
}
