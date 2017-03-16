import Backbone from 'backbone';
import ReactDOM from 'react-dom'
import React from 'react'
import {TreeModel, TreeCollection} from './models/tree-model.js'
import {TreeListComponent} from './components/tree-component.js'
console.log(TreeListComponent)
const AppRouter = Backbone.Router.extend({
	initialize: function(){
		Backbone.history.start()
	},

	routes: {
		'':'showHomePage',
		'tree/:id' :'showTreePage',
},
showHomePage: function(){
	ReactDOM.render(<TreeView />, document.querySelector('#app-container'))
},


})

new AppRouter()
