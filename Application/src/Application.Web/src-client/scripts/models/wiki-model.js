import Backbone from 'backbone';

export const WikiModel = Backbone.Model.extend({
  initialize: function(latinName){
    this.url = `${this.url}${latinName}&prop=text&section=0&format=json&callback=?`
  },
  url:'https://en.wikipedia.org/w/api.php?action=parse&page=',

})

export const WikiCollection = Backbone.Collection.extend({
  initialize: function(familyName){
    this.url = `${this.url}${latinName}&callback=?`
  },

    url:'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=',
    model: WikiModel
})
