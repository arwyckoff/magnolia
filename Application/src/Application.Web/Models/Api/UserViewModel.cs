using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Web.Models.Api
{
    public class UserViewModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public List<UserPlantViewModel> Plants { get; set; }

        public UserViewModel()
        {
            Plants = new List<UserPlantViewModel>();
        }
    }
}
