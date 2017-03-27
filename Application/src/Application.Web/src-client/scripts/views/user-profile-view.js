import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
import {UserProfileComponent} from '../components/user-profile.js'

export const UserProfileView = React.createClass({
  render: function(){
    return(
      <div className = "container-user">
        <UserProfileComponent/>
      </div>
    )
  }
})
