import Backbone from 'backbone'
import {STORE} from './store.js'
import {ACTIONS} from './actions.js'
import {BROWSE_ACTIONS} from './browse_actions.js'
import {_getFilteredCharacteristics} from './utils/getFilteredCharacteristics.js';
import {_getPreferredCharacteristics} from './utils/getPreferredCharacteristics.js';
import {_getFilteredTrees} from './utils/getFilteredTrees.js';
import {_getLegalCharacteristics} from './utils/getLegalCharacteristics.js';
import {_getBestBetweenPreferredAndOtherwise} from './utils/getMostCommonCharacteristic.js';



export const ID_ACTIONS = {
  updateQuestionNumber: function(currentQuestion){
    STORE.setStore('currentQuestion', currentQuestion+1)
  },

  updateQuestionInfo: function(category, filterCharacter){
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
    console.log(best)
    let commonObj= _getBestBetweenPreferredAndOtherwise(preferredCharObj.preferred, preferredCharObj.otherwise, filteredTrees, 0)
    STORE.setStore('best', commonObj)
    let currentQuestion = STORE.getStoreData().currentQuestion
     ID_ACTIONS.updateQuestionNumber(currentQuestion)
    },

  firstQuestionAction: function(category){
    ACTIONS.changeCategory(category)
      let filterList = STORE.getStoreData().filterChars
      let iDKs = STORE.getStoreData().iDKs
      let categories = STORE.getStoreData().categories
        let legalArray = _getLegalCharacteristics(filterList, iDKs, categories, 3)
        STORE.setStore('legalChars', legalArray)
        let preferredCharObj = _getPreferredCharacteristics(legalArray, category)
        let filteredTrees = STORE.getStoreData().filteredTrees
        STORE.setStore('splitByPreference', preferredCharObj)
        let commonObj= _getBestBetweenPreferredAndOtherwise(preferredCharObj.preferred, preferredCharObj.otherwise, filteredTrees, .3)
        STORE.setStore('best', commonObj)
            let currentQuestion = STORE.getStoreData().currentQuestion
        ID_ACTIONS.updateQuestionNumber(currentQuestion)
  },

  resetIDProps: function(){
    let allTrees = STORE.getStoreData().treeListData
    STORE.setStore('filteredTrees', allTrees)
    STORE.setStore('currentQuestion', 1)
    STORE.setStore('categorySelect', '')
    STORE.setStore('characteristicSelect', '')
    STORE.setStore('filterChars', [])
    STORE.setStore('legalChars', [])
    STORE.setStore('splitByPreference', {preferred: [], otherwise: []})
    STORE.setStore('best', {characteristic: null,  percentage: 0})
    STORE.setStore('iDKs', {LEAF:{totalIDK: 0, idkRun: 0},
                                 TWIG:{totalIDK: 0,idkRun: 0},
                                 FLOWER:{totalIDK: 0,idkRun: 0},
                                 FRUIT:{totalIDK: 0,idkRun: 0},
                                 GENERAL:{totalIDK: 0,idkRun: 0},})
},
}
