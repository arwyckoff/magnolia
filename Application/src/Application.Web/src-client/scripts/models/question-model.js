import Backbone from 'backbone'

export const QuestionModel = Backbone.Model.extend({
  initialize: function(){},
  url: '/api/questions'

})

export const QuestionCollection = Backbone.Collection.extend({
	model: QuestionModel,
	url: '/api/questions'
})
