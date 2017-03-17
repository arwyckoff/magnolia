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

    ACTIONS.fetchMyTree(window.location.hash.slice(1, 2))
    console.log(this.props)
ACTIONS.fetchMyWiki(window.location.hash.slice(3))

  },

  render: function(){
    return(
      <div className = "container">
        <h1>Profile page</h1>
        <ProfileComponent {...this.state}/>
      </div>
    )
  }

})
