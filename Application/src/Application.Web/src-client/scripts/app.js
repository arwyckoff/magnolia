import Backbone from 'backbone';
import ReactDOM from 'react-dom'
import React from 'react'
import {TreeModel, TreeCollection} from './models/tree-model.js'
import {HomeView} from './views/home-view.js'
import {ViewController} from './viewController.js'
import{ProfileView} from './views/profile-view.js'
import {WikiModel} from './models/wiki-model.js'
import $ from 'jquery'



const AppRouter = Backbone.Router.extend({
	initialize: function(){
		Backbone.history.start()
	},

	routes: {
		'':'showHomePage',
		':id/:latinName': 'showProfilePage',
    'register': 'showRegisterPage',
},

showHomePage: function(){
	ReactDOM.render(<ViewController fromRoute = {'HOME'} />, document.querySelector('#app-container'))
},

// showProfilePage: function(id){
// 		ReactDOM.render(<ViewController fromRoute = {'PROFILE'} />, document.querySelector('#app-container'))
// },
showProfilePage: function(id, currentLatinName){
  let treeModel = new TreeModel(id)
  let wikiModel = new WikiModel(currentLatinName)
$.when(treeModel.fetch(),
      wikiModel.fetch()
).then(function(serverRes){
  let profileObj = new ProfileView()
  profileObj.render(treeModel, wikiModel)
})
},
showRegisterPage: function(){
		ReactDOM.render(<ViewController fromRoute = {'REGISTER'} />, document.querySelector('#app-container'))
}
})

new AppRouter()
