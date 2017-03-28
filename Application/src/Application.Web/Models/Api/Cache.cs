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
        private static List<PlantViewModel> _plantViewModels;
        private static Dictionary<string, List<QuestionViewModel>> _questionViewModels;
        private static Dictionary<string, List<CharacteristicViewModel>> _characteristicViewModels;

        private Cache() { }

        public async static Task<Dictionary<string, List<CharacteristicViewModel>>> GetCharacteristicViewModels(MagnoliaContext context)
        {
            if (_characteristicViewModels != null)
                return _characteristicViewModels;

            var characteristics = await context.Characteristics.Include(s => s.States)
                                                    .Include(s => s.Category)
                                                    .ToListAsync();

            var characteristicViewModels = new Dictionary<string, List<CharacteristicViewModel>>();

            foreach (var characteristic in characteristics)
            {
                var category = characteristic.Category.Value;
                if (!characteristicViewModels.Keys.Any(k => k == category))
                {
                    characteristicViewModels.Add(category, new List<CharacteristicViewModel>());
                }

                var characteristicViewModel = new CharacteristicViewModel()
                {
                    Id = characteristic.Id,
                    Characteristic = characteristic.Value,
                    Depends = characteristic.Depends,
                    Permutations = characteristic.Permutations
                };

                foreach (var state in characteristic.States)
                {
                    if (!context.PlantCharacteristics.Any(s => s.StateId == state.Id))
                        continue;

                    characteristicViewModel.States.Add(new StateViewModel()
                    {
                        Characteristic = characteristic.Value,
                        State = state.Value,
                        Code = state.Code
                    });
                }

                characteristicViewModels[category].Add(characteristicViewModel);
            }

            return _characteristicViewModels = characteristicViewModels;
        }

        public async static Task<Dictionary<string, List<QuestionViewModel>>> GetQuestionViewModels(MagnoliaContext context)
        {
            if (_questionViewModels != null)
                return _questionViewModels;

            var questions = await context.Questions.Include(q => q.Answers)
                                                    .Include(q => q.Depends)
                                                    .Include(q => q.SkipIf)
                                                    .ToListAsync();

            var questionViewModels = new Dictionary<string, List<QuestionViewModel>>();

            foreach (var question in questions)
            {
                var q = new QuestionViewModel()
                {
                    Question = question.Value,
                    Category = question.Category,
                    Description = question.Description,
                    SkipIf = question.SkipIfId == null ? "" : context.QuestionAnswers.FirstOrDefault(a => a.Id == question.SkipIfId).Code,
                    Depends = question.Depends == null ? "" : context.QuestionAnswers.FirstOrDefault(a => a.Id == question.DependsId).Code
                };

                foreach (var answer in question.Answers)
                {
                    var a = new AnswerViewModel();
                    a.Answer = answer.Value;
                    a.Description = answer.Description;
                    a.Code = answer.Code;
                    a.Apply = answer.ApplyId == 0 ? "" : context.States.FirstOrDefault(s => s.Id == answer.ApplyId).Code;

                    q.Answers.Add(a);
                }

                if (questionViewModels.Keys.Any(k => k == q.Category))
                {
                    questionViewModels[q.Category].Add(q);
                }
                else
                {
                    questionViewModels.Add(q.Category, new List<QuestionViewModel>() { q });
                }
            }

            _questionViewModels = questionViewModels;

            return _questionViewModels;
        }

        public async static Task<List<PlantViewModel>> GetPlantViewModels(MagnoliaContext context)
        {
            if (_plantViewModels != null)
                return _plantViewModels;

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
