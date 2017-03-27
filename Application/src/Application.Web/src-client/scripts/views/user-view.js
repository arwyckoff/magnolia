import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
import {UserProfileComponent} from '../components/user-profile.js'

export const UserView = React.createClass({
  getInitialState: function(){
    return STORE.getStoreData()
  },
  componentDidMount: function(){
        console.log(this.props.currentUser)
  },

  render: function(){
    return(
      <div className = "container-user">
        <UserProfileComponent {...this.state}/>
      </div>
    )
  }
})