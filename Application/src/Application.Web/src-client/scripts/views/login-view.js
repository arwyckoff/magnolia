import React from 'react'
import {LoginComponent} from '../components/login-component.js'

export const LoginView = React.createClass({
  render: function(){
    return(
      <div className = "container-login">
        <LoginComponent/>
      </div>
    )
  }
})
