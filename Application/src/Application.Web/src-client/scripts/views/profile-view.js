import Backbone from 'backbone'
import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
import {GenusComponent, ProfileComponent} from '../components/profile-component.js'


export const ProfileView = React.createClass({
  getInitialState: function(){
    return STORE.getStoreData()
  },


  componentDidMount: function(){
    let component = this
    let latinName = window.location.hash.slice(6)
    let latinGenus = latinName.split(' ')
    let latinGenusWord = latinGenus[0]
    STORE.setStore('genus', latinGenusWord)
    console.log(this.state.genus)
    ACTIONS.fetchGenusTrees(this.state.genus)
    ACTIONS.fetchMyLatinTree(window.location.hash.slice(6))
    ACTIONS.fetchMyWiki(window.location.hash.slice(6))

  },

  render: function(){
    return(
      <div className = "profile-container">
        <ProfileComponent {...this.state}/>
        <GenusComponent {...this.state}/>
      </div>
    )
  }

})
