import React from 'react'
import { ACTIONS } from '../actions.js'
import { UserModel } from '../models/model-user.js'

export const LoginComponent = React.createClass({

  _handleLogin: function (evt) {
    evt.preventDefault()
    let formEl = evt.target
    let email = formEl.emailField.value
    let password = formEl.passwordField.value
    ACTIONS.loginUser(email, password)
  },

  render: function () {
    return (
      <div className="hero">
        <div className="auth-form login-box">
          <h2>login to your account</h2>
          <form onSubmit={this._handleLogin}>
            <div className="group">
              <input type="text" className="mag-form" name="emailField" placeholder="Email" />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <div className="group">
              <input type="password" className="mag-form" name="passwordField" placeholder="Password" />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <button type="submit" className="loginbut"><img src="../../images/tree-576846_1280.png" className="loginlog" /><span className="label loginarrow_box">LOG in</span></button>
          </form>
        </div>
      </div>
    )
  }
})
