import Backbone from 'backbone'

export const GenusModel = Backbone.Model.extend({
	initialize: function(genusName){
		this.url = `${this.url}/${genusName}/plants`
	},

	url: '/api/genus/latin'

})

export const GenusCollection = Backbone.Collection.extend({
  initialize: function(genusName){
		this.url = `${this.url}/${genusName}/plants`
	},

  model: GenusModel,
  url: '/api/genus/latin'
})
