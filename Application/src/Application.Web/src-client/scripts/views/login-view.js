import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
import {LoginComponent} from '../components/login-component.js'

export const LoginView = React.createClass({
  render: function(){
    return(
      <div className = "container">
        <LoginComponent/>

      </div>
    )
  }
})
