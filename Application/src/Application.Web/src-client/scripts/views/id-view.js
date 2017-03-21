import Backbone from 'backbone'
import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
import {IdComponent} from '../components/id-component.js'


export const IdentifyView = React.createClass({
  getInitialState: function(){
    return STORE.getStoreData()
  },


  componentDidMount: function(){
    let component = this

  },

  render: function(){
    return(
      <div className = "profile-container">
        <IdComponent {...this.state}/>
      </div>
    )
  }

})
