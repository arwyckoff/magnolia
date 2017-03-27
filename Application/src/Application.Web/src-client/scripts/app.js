import Backbone from 'backbone';
import ReactDOM from 'react-dom'
import React from 'react'
import {ViewController} from './viewController.js'


if(window.location.hostname === 'localhost'){
    let headEl = document.querySelector('head')
    let linkEl = document.querySelector('link[href="./css/styles.css"]')
    headEl.removeChild(linkEl)
}


const AppRouter = Backbone.Router.extend({
	initialize: function(){
		Backbone.history.start()
	},

	routes: {
		'':'showHomePage',
		'tree/:latinName': 'showProfilePage',
    'register': 'showRegisterPage',
		'logout': 'showLogoutPage',
		'login': 'showLoginPage',
    'browse': 'showBrowsePage',
    'identify': 'showIdentifyPage',
    'my-profile': 'showUserPage',
},

showHomePage: function(){

	ReactDOM.render(<ViewController fromRoute = {'HOME'} />, document.querySelector('#app-container'))
},
showBrowsePage: function(){
  	ReactDOM.render(<ViewController fromRoute = {'BROWSE'} />, document.querySelector('#app-container'))
},
showProfilePage: function(latinName){
		ReactDOM.render(<ViewController fromRoute = {'PROFILE'} />, document.querySelector('#app-container'))
},

showRegisterPage: function(){
		ReactDOM.render(<ViewController fromRoute = {'REGISTER'} />, document.querySelector('#app-container'))
},
showLoginPage: function(){
		ReactDOM.render(<ViewController fromRoute = {'LOGIN'} />, document.querySelector('#app-container'))
},
showLogoutPage: function(){
		ReactDOM.render(<ViewController fromRoute = {'LOGOUT'} />, document.querySelector('#app-container'))
},
showIdentifyPage: function(){
    ReactDOM.render(<ViewController fromRoute = {'IDENTIFY'} />, document.querySelector('#app-container'))
},
showUserPage: function(){
    ReactDOM.render(<ViewController fromRoute = {'MYPROFILE'} />, document.querySelector('#app-container'))
},
})

new AppRouter()
