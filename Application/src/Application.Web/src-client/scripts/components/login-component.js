import React from 'react'
import {ACTIONS} from '../actions.js'
import {UserModel} from '../models/model-user.js'

export const LoginComponent = React.createClass({

  _handleLogin: function(evt){
    evt.preventDefault()
    let formEl = evt.target
    let userVal = formEl.usernameField.value
    let userPw = formEl.passwordField.value
    ACTIONS.loginUser(userVal, userPw)
  },

  render: function(){
      return (
         <div className="auth-form">
				<form onSubmit = {this._handleLogin}>
					<input type="text" className="form-control" name="usernameField" placeholder="Username"/>
	            <input type="password" className="form-control" name="passwordField" placeholder= "Password"/>


	            <button type="submit">Log in</button>
				</form>

			</div>
      )
   }
})
