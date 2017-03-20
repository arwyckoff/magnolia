import Backbone from 'backbone'
import {TreeModel, TreeCollection} from './models/tree-model.js'
import {WikiModel, WikiCollection} from './models/wiki-model.js'
import {UserModel} from './models/model-user.js'

import {STORE} from './store.js'
// import {PlantViewModel} from '../../Models/Api/PlantViewModel.cs'

export const ACTIONS = {
  fetchAllTrees: function(){
    let TreeCollInstance = new TreeCollection()
    TreeCollInstance.fetch().then(function(serverRes){
      STORE.setStore('treeListData', serverRes)
    })
  },

    fetchMyTree: function(id){
      let TreeModelInstance = new TreeModel(id)
      TreeModelInstance.fetch().then(function(serverRes){
      STORE.setStore('myTree', serverRes)
    })
  },

    fetchMyWiki: function(latinName){
      let WikiModelInstance = new WikiModel(latinName)
      WikiModelInstance.fetch().then(function(serverRes){
      STORE.setStore('myWiki', serverRes)
        console.log(serverRes.parse.text)
  })
},
    changeCurrentNav: function(selectedAppRoute, urlRoute){
      STORE.setStore('currentNavRoute', selectedAppRoute)
      window.location.hash = urlRoute
},
  registerNewUser: function(usrObj){
      UserModel.register(usrObj).then(function(serverRes){
        ACTIONS.changeCurrentNav('HOME', '')
})
},

  loginUser: function(u, p){
    UserModel.logIn(u, p).then(function(serverRes){
    STORE.setStore('currentUser', serverRes )
    ACTIONS.changeCurrentNav('HOME', '')
  })
},

fetchCurrentUser: function(){
  UserModel.getCurrentUser().then(function(serverRes){
    if(serverRes.user !== null){
    STORE.setStore('currentUser', serverRes.user)
  }
  })
},
logoutUser: function(){
  UserModel.logOut().then(function(serverRes){
    STORE.setStore('currentUser', {})
    ACTIONS.changeCurrentNav('HOME', '')
  })
}
}
