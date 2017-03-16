using Application.Web.Models.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Web.Models.Api
{
    public class UserPlantViewModel
    {
        public PlantViewModel Plant { get; set; }
        public string Comment { get; set; }
    }
}
