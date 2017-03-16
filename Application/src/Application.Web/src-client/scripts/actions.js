import Backbone from 'backbone'
<<<<<<< HEAD
import {TreeModel, TreeCollection} from './models/tree-model.js'
=======
>>>>>>> ed91038030a5233f933017b8e888f85de9aaed19
import {STORE} from './store.js'
// import {PlantViewModel} from '../../Models/Api/PlantViewModel.cs'

export const ACTIONS = {
  fetchAllTrees: function(){
    let TreeCollInstance = new TreeCollection()
    TreeCollInstance.fetch().then(function(serverRes){
      console.log('tree data', serverRes)
      STORE.setStore('treeListData', serverRes)
    })
  },
}
