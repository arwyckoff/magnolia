import Backbone from 'backbone'
import {STORE} from './store.js'


export const ACTIONS = {
  fetchAllTrees: function(){
    let TreeCollInstance = new TreeCollection()
    TreeCollInstance.fetch().then(function(serverRes){
      STORE.setStore('treeListData', serverRes)
    })
  },

  fetchWiki: function(latinname){
    let WikiParaModel = new WikiModel(latinname)
    WikiParaModel.fetch().then(function(serverRes){
            STORE.setStore('wikiData', serverRes)
    })
  }


}
