using Magnolia.Context.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magnolia.Api.Models
{
    public class Cache
    {
        public static List<PlantViewModel> _plantViewModels;

        private Cache() { }

        public async static Task<List<PlantViewModel>> GetPlantViewModels(MagnoliaContext context)
        {
            if (_plantViewModels == null)
            {

            }

            var plants = await context.Plants.Include(p => p.PlantCharacteristics)
                     .Include(p => p.Family)
                     .Where(p => p.PlantCharacteristics.Count > 0)
                     .ToListAsync();

            var plantViewModels = new List<PlantViewModel>();

            foreach (var plant in plants)
            {
                var plantViewModel = new PlantViewModel()
                {
                    Id = plant.Id,
                    CommonName = plant.CommonName,
                    SecondaryName = plant.SecondaryName ?? "",
                    TertiaryName = plant.TertiaryName ?? "",
                    LatinName = plant.LatinName,
                    Family = new PlantsFamilyViewModel()
                    {
                        CommonName = plant.Family.CommonName,
                        LatinName = plant.Family.LatinName
                    }
                };

                foreach (var characteristic in plant.PlantCharacteristics)
                {
                    var state = await context.States.Include(s => s.Characteristic)
                                                     .FirstOrDefaultAsync(s => s.Id == characteristic.StateId);

                    if (plantViewModel.Characteristics.Keys.Any(k => k == state.Code))
                        continue;

                    plantViewModel.Characteristics.Add(state.Code, null);
                }

                plantViewModels.Add(plantViewModel);
            }

            _plantViewModels = plantViewModels;

            return _plantViewModels;
        }
    }
}
