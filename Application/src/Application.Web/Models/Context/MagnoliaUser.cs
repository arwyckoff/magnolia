using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Context.Models
{
    public class MagnoliaUser : IdentityUser
    {
        public List<UserPlants> Plants { get; set; }

        public MagnoliaUser()
        {
            Plants = new List<UserPlants>();
        }
    }
}
