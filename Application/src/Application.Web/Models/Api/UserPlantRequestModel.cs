using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Api.Models
{
    public class UserPlantRequestModel
    {
        [Required]
        public int PlantId { get; set; }

        [DataType(DataType.Text)]
        [StringLength(150, ErrorMessage = "{0}'s may not exceed 150 characters.")]
        public string Comment { get; set; }
    }
}
