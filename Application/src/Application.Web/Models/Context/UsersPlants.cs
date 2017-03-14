using Magnolia.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Models
{
    public class UserPlants
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int PlantId { get; set; }
        
        public string Comment { get; set; }
        
        public MagnoliaUser User { get; set; }
        public Plant Plant { get; set; }
    }
}
