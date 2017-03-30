import Backbone from 'backbone'
import { STORE } from './store.js'
import { ACTIONS } from './actions.js'
import { BROWSE_ACTIONS } from './browse_actions.js'
import { catQuestionTrackerEmpty } from './utils/catQuestionTrackerEmpty.js'
import { QuestionModel, QuestionCollection } from './models/question-model.js'
import { _getFilteredCharacteristics } from './utils/getFilteredCharacteristics.js';
import { _getPreferredCharacteristics } from './utils/getPreferredCharacteristics.js';
import { _getFilteredTrees } from './utils/getFilteredTrees.js';
import { _getLegalCharacteristics } from './utils/getLegalCharacteristics.js';
import { _getBestBetweenPreferredAndOtherwise } from './utils/getMostCommonCharacteristic.js';



export const ID_ACTIONS = {
  updateQuestionNumber: function (currentQuestion) {
    STORE.setStore('currentQuestion', currentQuestion + 1)
  },
  
  fetchAllQuestions: function () {
    let QuestionCollInstance = new QuestionCollection()
    QuestionCollInstance.fetch().then(function (serverRes) {
      STORE.setStore('allQuestions', serverRes)
    })
  },

  getNextBest: function (category, characteristic) {
    let prevQuesArray = STORE.getStoreData().prevQuestions
    prevQuesArray.push(characteristic)
    STORE.setStore('prevQuestions', prevQuesArray)
    let iDKs = STORE.getStoreData().iDKs + 1
    let categories = STORE.getStoreData().categories
    let legalArray = STORE.getStoreData().legalChars
    let preferredCharObj = STORE.getStoreData().splitByPreference
    let filteredTrees = STORE.getStoreData().filteredTrees
    let commonObj = _getBestBetweenPreferredAndOtherwise(preferredCharObj.preferred, preferredCharObj.otherwise, filteredTrees, .3)
    STORE.setStore('best', commonObj)
    let currentQuestion = STORE.getStoreData().currentQuestion
    ID_ACTIONS.updateQuestionNumber(currentQuestion)
  },

  updateQuestionAsked: function (characteristic) {
    let prevQuesArray = STORE.getStoreData().prevQuestions
    prevQuesArray.push(characteristic)
    STORE.setStore('prevQuestions', prevQuesArray)
  },

  updateQuestionInfo: function (category, filterCharacter, characteristic) {
    let prevQuesArray = STORE.getStoreData().prevQuestions
    prevQuesArray.push(characteristic)
    STORE.setStore('prevQuestions', prevQuesArray)
    let filterList = STORE.getStoreData().filterChars
    let futurefiltCharsHandler = [...filterList]
    futurefiltCharsHandler.push(filterCharacter)
    BROWSE_ACTIONS.changeFilter(filterCharacter)
    let iDKs = STORE.getStoreData().iDKs
    let categories = STORE.getStoreData().categories
    let legalArray = _getLegalCharacteristics(filterList, iDKs, categories, 3)
    let preferredCharObj = _getPreferredCharacteristics(legalArray, category)
    let filteredTrees = STORE.getStoreData().filteredTrees
    let best = STORE.getStoreData().best
    let commonObj = _getBestBetweenPreferredAndOtherwise(preferredCharObj.preferred, preferredCharObj.otherwise, filteredTrees, .3)
    STORE.setStore('best', commonObj)
    let currentQuestion = STORE.getStoreData().currentQuestion
    ID_ACTIONS.updateQuestionNumber(currentQuestion)
  },

  updateQuestionBack: function (category) {
    let filterList = STORE.getStoreData().filterChars
    let prevQuesArray = STORE.getStoreData().prevQuestions
    prevQuesArray.pop()
    STORE.setStore('prevQuestions', prevQuesArray)
    let iDKs = STORE.getStoreData().iDKs
    let categories = STORE.getStoreData().categories
    let legalArray = _getLegalCharacteristics(filterList, iDKs, categories, 3)
    let preferredCharObj = _getPreferredCharacteristics(legalArray, category)
    let filteredTrees = STORE.getStoreData().filteredTrees
    let best = STORE.getStoreData().best
    let commonObj = _getBestBetweenPreferredAndOtherwise(preferredCharObj.preferred, preferredCharObj.otherwise, filteredTrees, 0)
    STORE.setStore('best', commonObj)
    let currentQuestion = STORE.getStoreData().currentQuestion
    let backOne = currentQuestion - 1
    STORE.setStore('currentQuestion', backOne)
  },
  
  firstQuestionAction: function (category) {
    ACTIONS.changeCategory(category)
    let filterList = STORE.getStoreData().filterChars
    let iDKs = STORE.getStoreData().iDKs
    let categories = STORE.getStoreData().categories
    let legalArray = _getLegalCharacteristics(filterList, iDKs, categories, 3)
    STORE.setStore('legalChars', legalArray)
    let preferredCharObj = _getPreferredCharacteristics(legalArray, category)
    let filteredTrees = STORE.getStoreData().filteredTrees
    STORE.setStore('splitByPreference', preferredCharObj)
    let commonObj = _getBestBetweenPreferredAndOtherwise(preferredCharObj.preferred, preferredCharObj.otherwise, filteredTrees, .3)
    STORE.setStore('best', commonObj)
    let currentQuestion = STORE.getStoreData().currentQuestion
    this.updateQuestionNumber(currentQuestion)
    let answeredQuestionArray = STORE.getStoreData().answeredQuestions;
    answeredQuestionArray.push(category);
    STORE.setStore('answeredQuestions', answeredQuestionArray);
  },

  answerPhaseOneAction: function (category, code, apply, answeredQuestion, characteristic) {
    let data = STORE.getStoreData();
    let filterChars = data.filterChars
    if (apply !== "") {
      BROWSE_ACTIONS.changeFilter(apply)
    }
    let catQuestionTrackerCopy = data.catQuestionTracker
    catQuestionTrackerCopy[category]["codeArray"].push(code)
    STORE.setStore('catQuestionTracker', catQuestionTrackerCopy)
    let answeredQuestionArray = STORE.getStoreData().answeredQuestions;
    answeredQuestionArray.push(answeredQuestion);
    STORE.setStore('answeredQuestions', answeredQuestionArray);
    this.updateQuestionNumber(data.currentQuestion)
    let prevQuesArray = STORE.getStoreData().prevQuestions
    prevQuesArray.push(characteristic)
    STORE.setStore('prevQuestions', prevQuesArray)
    let iDKs = STORE.getStoreData().iDKs
    let categories = STORE.getStoreData().categories
    let legalArray = _getLegalCharacteristics(STORE.getStoreData().filterChars, iDKs, categories, 3)
    let preferredCharObj = _getPreferredCharacteristics(legalArray, category)
    let filteredTrees = STORE.getStoreData().filteredTrees
    let best = STORE.getStoreData().best
    let commonObj = _getBestBetweenPreferredAndOtherwise(preferredCharObj.preferred, preferredCharObj.otherwise, filteredTrees, .3)
    STORE.setStore('best', commonObj)
  },

  resetIDProps: function () {
    let allTrees = STORE.getStoreData().treeListData
    STORE.setStore('currentQuestion', 1)
    STORE.setStore('categorySelect', '')
    STORE.setStore('characteristicSelect', '')
    STORE.setStore('filterChars', [])
    STORE.setStore('legalChars', [])
    STORE.setStore('splitByPreference', { preferred: [], otherwise: [] })
    STORE.setStore('best', { characteristic: null, percentage: 0 })
    STORE.setStore('iDKs', {
      LEAF: { totalIDK: 0, idkRun: 0 },
      TWIG: { totalIDK: 0, idkRun: 0 },
      FLOWER: { totalIDK: 0, idkRun: 0 },
      FRUIT: { totalIDK: 0, idkRun: 0 },
      GENERAL: { totalIDK: 0, idkRun: 0 },
    })
    STORE.setStore('filteredTrees', allTrees)
    STORE.setStore('prevQuestions', [])
    STORE.setStore('catQuestionTracker', catQuestionTrackerEmpty)
    STORE.setStore('answeredQuestions', [])
  },
}
