import Backbone from 'backbone'
import {TreeModel, TreeCollection} from './models/tree-model.js'
import {WikiModel, WikiCollection} from './models/wiki-model.js'
import {UserModel} from './models/model-user.js'
import {TreeNameModel} from './models/tree-name-model.js'

import {STORE} from './store.js'


export const ACTIONS = {

fetchAllTrees: function(){
  let TreeCollInstance = new TreeCollection()
  TreeCollInstance.fetch().then(function(serverRes){
    STORE.setStore('treeListData', serverRes)
  fetchAllTrees: function(){
    let TreeCollInstance = new TreeCollection()
    TreeCollInstance.fetch().then(function(serverRes){

      STORE.setStore('treeListData', serverRes)
      STORE.setStore("filteredTrees", serverRes)
    })
  },

fetchMyLatinTree: function(latinName){
  let LatinModelInstance = new TreeNameModel(latinName)
    LatinModelInstance.fetch().then(function(serverRes){
    STORE.setStore('myTree', serverRes)
      })
    },

fetchMyWiki: function(latinName){
  let WikiModelInstance = new WikiModel(latinName)
  WikiModelInstance.fetch().then(function(serverRes){
    // console.log(serverRes)
    if (serverRes.originalimage ==='undefined'){
      STORE.setStore('myImage', '')
    }
    else if (serverRes.originalimage !=='undefined' && serverRes.originalimage.source !== 'undefined'){
      STORE.setStore('myImage', serverRes.originalimage.source)
    }
    STORE.setStore('myWiki', serverRes.extract)
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

  loginUser: function(email, password){
    UserModel.logIn(email, password).then(function(serverRes){
    STORE.setStore('currentUser', serverRes )
    ACTIONS.changeCurrentNav('HOME', '')
  })
},
  fetchCurrentUser: function(){
    let currentUserInstance = new UserModel()
    currentUserInstance.fetch().then(function(serverRes){
    STORE.setStore('currentUser', serverRes)

  })
},
registerNewUser: function(dataObj){
    let newUserInstance= new UserModel()
    newUserInstance.set(dataObj)
    newUserInstance.save().then(function(serverRes){
    ACTIONS.changeCurrentNav('HOME', '')

  })
},
registerNewUserM: function(dataObj){
    UserModel.register(dataObj).then(function(serverRes){
    ACTIONS.changeCurrentNav('HOME', '')

  })
},

logoutUser: function(){
    UserModel.logOut().then(function(){
    STORE.setStore('currentUser', {id: null,
                  email: null,
                  password: null})
    ACTIONS.changeCurrentNav('HOME', '')
    console.log(this.props)
  })
}
}
