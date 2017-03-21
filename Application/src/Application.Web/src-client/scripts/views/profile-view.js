import Backbone from 'backbone'
import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
import {ProfileComponent} from '../components/profile-component.js'


export const ProfileView = React.createClass({
  getInitialState: function(){
    return STORE.getStoreData()
  },


  componentDidMount: function(){
    let component = this
    console.log(this.state)
    ACTIONS.fetchMyLatinTree(window.location.hash.slice(6))
    ACTIONS.fetchMyWiki(window.location.hash.slice(6))
  },

  render: function(){
    return(
      <div className = "container">
        <ProfileComponent {...this.state}/>
      </div>
    )
  }

})
