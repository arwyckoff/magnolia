import Backbone from 'backbone'
import {TreeModel, TreeCollection} from './models/tree-model.js'

import {STORE} from './store.js'
// import {PlantViewModel} from '../../Models/Api/PlantViewModel.cs'

export const ACTIONS = {
  fetchAllTrees: function(){
    let TreeCollInstance = new TreeCollection()
    TreeCollInstance.fetch().then(function(serverRes){
      // console.log('tree data', serverRes)
      STORE.setStore('treeListData', serverRes)
    })
  },

  changeFilter: function(filterVal){
  STORE.setStore('filterChars', filterVal)
  }

}
