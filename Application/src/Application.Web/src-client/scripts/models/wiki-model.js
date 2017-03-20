import Backbone from 'backbone';

export const WikiModel = Backbone.Model.extend({
  initialize: function(latinName){
    this.url = `${this.url}${latinName}`
  },
url:"https://en.wikipedia.org/api/rest_v1/page/summary/"
})

export const WikiCollection = Backbone.Collection.extend({
  initialize: function(familyName){
    this.url = `${this.url}${latinName}`
  },

    url:"https://en.wikipedia.org/api/rest_v1/page/summary/",
    model: WikiModel
})
