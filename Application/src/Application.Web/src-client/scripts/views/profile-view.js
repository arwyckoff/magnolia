import Backbone from 'backbone'
import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
import {GenusComponent, ProfileComponent} from '../components/profile-component.js'


export const ProfileView = React.createClass({
  getInitialState: function(){
          STORE.setStore('myImage', '')
    return STORE.getStoreData()

  },


  componentDidMount: function(){
    let component = this
    let latinName = window.location.hash.slice(6)
    let latinGenus = latinName.split(' ')
    let latinGenusWord = latinGenus[0]
    STORE.setStore('genus', latinGenusWord)
    console.log(this.state.genus)
    ACTIONS.fetchProfileStuff(this.state.genus, window.location.hash.slice(6))

  },

  render: function(){
    return(
      <div className = "profile-container">
        <ProfileComponent {...this.props}/>
        <GenusComponent {...this.props}/>
      </div>
    )
  }

})
