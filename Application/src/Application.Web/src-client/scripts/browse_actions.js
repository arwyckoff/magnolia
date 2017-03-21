import Backbone from 'backbone'
import _getFilteredTrees from "./utils/getFilteredTrees"
import {TreeModel, TreeCollection} from './models/tree-model.js'
import {WikiModel, WikiCollection} from './models/wiki-model.js'
import {UserModel} from './models/model-user.js'
import {STORE} from './store.js'


export const BROWSE_ACTIONS = {

  changeFilter: function(filterVal){
    let filterArray = [...STORE.getStoreData().filterChars]

    let index = filterArray.indexOf(filterVal)

    if(index === -1 && filterVal !== "all"){
      filterArray.push(filterVal)
      STORE.setStore('filterChars', filterArray)
      let filters = STORE.getStoreData().filterChars
      let allTrees = STORE.getStoreData().treeListData
      let filteredTrees = _getFilteredTrees(filters, allTrees)
      STORE.setStore("filteredTrees",filteredTrees )

    } else if(index > -1 && filterVal !== "all") {
      let filtersMinusOne = filterArray.splice(index, 1)
      STORE.setStore('filterChars', filterArray)

      let newChars = STORE.getStoreData().filterChars;
      let allTrees = STORE.getStoreData().treeListData;


      let filteredTrees = _getFilteredTrees(newChars, allTrees);
      
      STORE.setStore("filteredTrees",filteredTrees )

  } else if(filterVal === "all"){
      STORE.setStore("filterChars",[]);
      let newChars = STORE.getStoreData().filterChars;
      let allTrees = STORE.getStoreData().treeListData;
      let filteredTrees = _getFilteredTrees(newChars, allTrees);
      STORE.setStore("filteredTrees",filteredTrees )


  }
  // console.log(filtersMinusOne)
    // console.log(STORE.getStoreData().filteredTrees)
    // console.log(filteredTrees)
  },




}
