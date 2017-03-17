import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
import {LogoutComponent} from '../components/logout-component.js'

export const LogoutView = React.createClass({
  render: function(){
    return(
      <div className = "container">
        <LogoutComponent/>

      </div>
    )
  }
})
