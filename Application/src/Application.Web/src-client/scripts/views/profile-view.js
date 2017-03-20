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
        console.log('2asdasd')
    let component = this
        console.log('3asdasd')
ACTIONS.fetchMyLatinTree(window.location.hash.slice(1))
ACTIONS.fetchMyWiki(window.location.hash.slice(1))
  },

  render: function(){
    return(
      <div className = "container">
        <ProfileComponent {...this.state}/>
      </div>
    )
  }

})
