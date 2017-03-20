import Backbone from 'backbone'
import {TreeModel, TreeCollection} from './models/tree-model.js'
import {WikiModel, WikiCollection} from './models/wiki-model.js'
import {UserModel} from './models/model-user.js'
import {STORE} from './store.js'


export const ACTIONS = {

  changeFilter: function(filterVal){
  STORE.setStore('filterChars', filterVal)
  },


  
}
