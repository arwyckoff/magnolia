import Backbone from 'backbone'
// import {PlantViewModel} from '../../../Models/Api/PlantViewModel.cs'

export const TreeModel = Backbone.Model.extend({
	initialize: function(){
	},

	urlRoot: '/api/plants',
	idAttribute: 'id'
})

export const TreeCollection = Backbone.Collection.extend({
	model: TreeModel,
	url: '/api/plants'
})
