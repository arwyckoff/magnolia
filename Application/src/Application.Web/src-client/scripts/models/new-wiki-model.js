import Backbone from 'backbone';
import $ from 'jquery'

export const WikiGenusModel = Backbone.Model.extend({
  initialize: function(latinName){
      this.url = `${this.url}${latinName}&prop=text&section=0&format=json&callback=?`
  },
  url:'https://en.wikipedia.org/w/api.php?action=parse&page=',
})
