import Backbone from 'backbone'

export const CategoriesModel = Backbone.Model.extend({
  initialize: function(){},
  url: '/api/characteristics'

})

export const CategoriesCollection = Backbone.Collection.extend({
	model: CategoriesModel,
	url: '/api/characteristics'
})
