import Backbone from 'backbone'

export const TreeNameModel = Backbone.Model.extend({
	initialize: function(latinName){
		this.url = `${this.url}/${latinName}`
	},

	url: '/api/plants/byName'

})
