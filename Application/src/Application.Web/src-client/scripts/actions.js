import Backbone from 'backbone'
import {TreeModel, TreeCollection} from './models/tree-model.js'
import {WikiModel, WikiCollection} from './models/wiki-model.js'
import {CodeModel, CodeCollection} from './models/code-model.js'
import {UserModel} from './models/model-user.js'
import {TreeNameModel} from './models/tree-name-model.js'
import {CategoriesModel, CategoriesCollection} from "./models/categories-model.js"
import {GenusModel, GenusCollection} from './models/model-genus.js'
import {WikiGenusModel} from './models/new-wiki-model.js'

import {STORE} from './store.js'


export const ACTIONS = {
fetchGenusTrees: function(genusName){
  let GenusCollInstance = new GenusCollection(genusName)
  GenusCollInstance.fetch().then(function(serverRes){
    STORE.setStore('genusTrees', serverRes)
  })
},
fetchProfileStuff: function(genusName, latinName){
  let WikiModelInstance = new WikiModel(latinName)
  WikiModelInstance.fetch().then(function(serverRes){
    if (serverRes.originalimage ==='undefined'){
      STORE.setStore('myImage', '')
    }
    else if (serverRes.originalimage !=='undefined' && serverRes.originalimage.source !== 'undefined'){
      STORE.setStore('myImage', serverRes.originalimage.source)
    }
    STORE.setStore('myWiki', serverRes.extract)
        })
  let LatinModelInstance = new TreeNameModel(latinName)
    LatinModelInstance.fetch().then(function(serverRes){
    STORE.setStore('myTree', serverRes)
        })
      let GenusCollInstance = new GenusCollection(genusName)
      GenusCollInstance.fetch().then(function(serverRes){
        STORE.setStore('genusTrees', serverRes)
      })
},
fetchAllTrees: function(){
  let TreeCollInstance = new TreeCollection()
  TreeCollInstance.fetch().then(function(serverRes){
    STORE.setStore('treeListData', serverRes)
    STORE.setStore('filteredTrees', serverRes)
  })
  },

  fetchAllCategories: function(){
    let CatCollInstance = new CategoriesCollection()
    CatCollInstance.fetch().then(function(serverRes){
      console.log(serverRes)
      STORE.setStore('categories', serverRes)
    }, e => console.error(e))
  },

  fetchAllCharCodes: function(){
    let CodeCollectionInstance = new CodeCollection()
    CodeCollectionInstance.fetch().then(function(serverRes){
      STORE.setStore('codeList', serverRes)
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
fetchMyGenusWiki: function(latinName){
  let WikiGenusInstance = new WikiGenusModel(latinName)
    WikiGenusInstance.fetch().then(function(serverRes){
      console.log(serverRes)
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
  })
},

  changeCategory: function(cat){
    STORE.setStore('categorySelect', cat)
  },

  changeCharacteristic: function(char){
    STORE.setStore('characteristicSelect', char)
  }
}
