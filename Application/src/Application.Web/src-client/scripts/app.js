import Backbone from 'backbone';
import ReactDOM from 'react-dom'
import React from 'react'
<<<<<<< HEAD
import {TreeCollection} from './models/tree-model.js'
import {HomeView} from './views/home-view.js'
import ViewController from './viewController.js'
import {BrowseView} from './views/browse-view.js'


=======
import {TreeModel, TreeCollection} from './models/tree-model.js'
import {TreeListComponent} from './components/tree-component.js'
console.log(TreeListComponent)
>>>>>>> ed91038030a5233f933017b8e888f85de9aaed19
const AppRouter = Backbone.Router.extend({
	initialize: function(){
		Backbone.history.start()
	},

	routes: {
		'':'showHomePage'
},

showHomePage: function(){
	console.log('mISter HomeView')
	ReactDOM.render(<HomeView />, document.querySelector('#app-container'))

}
})

let newApp = new AppRouter()
