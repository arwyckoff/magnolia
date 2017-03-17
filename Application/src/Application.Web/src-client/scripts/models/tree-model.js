import Backbone from 'backbone'

export const TreeModel = Backbone.Model.extend({
	initialize: function(id){
		this.url = `${this.url}/${id}`
	},

	url: '/api/plants'

})

export const TreeCollection = Backbone.Collection.extend({
	model: TreeModel,
	url: '/api/plants'
})
