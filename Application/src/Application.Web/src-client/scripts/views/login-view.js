import React from 'react'
import {LoginComponent} from '../components/login-component.js'
import { STORE } from '../store.js'
export const LoginView = React.createClass({
  getInitialState: function(){
    return STORE.getStoreData()
  },
  render: function(){
    return(
      <div className = "container-login">
        <LoginComponent/>
      </div>
    )
  }
})
