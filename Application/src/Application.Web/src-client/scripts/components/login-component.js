import React from 'react'
import {ACTIONS} from '../actions.js'
import {UserModel} from '../models/model-user.js'

export const LoginComponent = React.createClass({

  _handleLogin: function(evt){
    evt.preventDefault()
    let formEl = evt.target
    let email = formEl.emailField.value
    let password = formEl.passwordField.value
    ACTIONS.loginUser(email, password)
  },

  render: function(){
      return (
        <div className = "hero">
              <img className = "hero-img" src = 'http://i64.tinypic.com/2lthudd.jpg'/>
         <div className="auth-form login-box">
				<form onSubmit = {this._handleLogin}>
					<input type="text" className="form-control" name="emailField" placeholder="Username"/>
	            <input type="password" className="form-control" name="passwordField" placeholder= "Password"/>


	            <button type="submit">Log in</button>
				</form>

			</div>
    </div>
      )
   }
})
