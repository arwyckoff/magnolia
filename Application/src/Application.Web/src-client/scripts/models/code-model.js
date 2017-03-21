import Backbone from 'backbone'

export const CodeModel = Backbone.Model.extend({
	initialize: function(){},
	urlRoot: '/api/characteristics/codes'

})

export const CodeCollection = Backbone.Collection.extend({
	model: CodeModel,
	url: '/api/characteristics/codes'
})
