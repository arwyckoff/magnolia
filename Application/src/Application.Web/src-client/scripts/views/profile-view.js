import Backbone from 'backbone'
import React from 'react'
import { ACTIONS } from '../actions.js'
import { STORE } from '../store.js'
import { GenusComponent, ProfileComponent } from '../components/profile-component.js'

export const ProfileView = React.createClass({

  componentWillMount: function () {
    let latinName = window.location.hash.slice(6)
    let latinGenus = latinName.split(' ')
    let latinGenusWord = latinGenus[0]
    STORE.setStore('genus', latinGenusWord)
    ACTIONS.fetchProfileStuff(latinGenusWord, latinName)
    STORE.setStore('myImage', '')
    let wikiLink = STORE.getStoreData().wikiLink
    let wholeLink = `${wikiLink}${latinName}`
    STORE.setStore('wikiLink', wholeLink)
    return STORE.getStoreData()
  },

  render: function () {
    if (this.props.genusTrees.length <= 0) {
      return (
        <div className="profile-container top-space">
          <ProfileComponent {...this.props} />
        </div>
      )
    } else {
      return (
        <div className="profile-container top-space">
          <ProfileComponent {...this.props} />
          <GenusComponent {...this.props} />
        </div>
      )
    }
  }
})
