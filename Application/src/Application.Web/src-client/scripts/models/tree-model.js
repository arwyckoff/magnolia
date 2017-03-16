import Backbone from 'backbone'
export const TreeModel = Backbone.Model.extend({
	urlRoot: '/api/plants/',
	idAttribute: 'id'
})

export const TreeCollection = Backbone.Collection.extend({
	model: TreeModel,
	url: '/api/plants'
})
