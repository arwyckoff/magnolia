import Backbone from 'backbone';
import ReactDOM from 'react-dom'
import React from 'react'
import {TreeCollection} from './models/tree-model.js'
import {HomeView} from './views/home-view.js'
import ViewController from './viewController.js'
import {BrowseView} from './views/browse-view.js'

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
		'':'showHomePage'
},

showHomePage: function(){
	// console.log('mISter HomeView')
	ReactDOM.render(<BrowseView />, document.querySelector('#app-container'))

}
})

let newApp = new AppRouter()
