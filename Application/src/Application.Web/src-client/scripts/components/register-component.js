import React from 'react'
import { ACTIONS } from '../actions.js'
import { UserModel } from '../models/model-user.js'

export const RegisterComponent = React.createClass({


  render: function () {
    return (
      <div className="auth-form login-box">
        <h2>create an account</h2>
        <form onSubmit={this._handleNewUser}>
          <div className="group">
            <input type="text" className="form-control" name="usernameField" placeholder="choose a username" />
            <span className="highlight"></span>
            <span className="bar"></span>
          </div>
          <div className="group">
            <input type="password" className="mag-form" name="passwordField" placeholder="choose a unique password" />
            <span className="highlight"></span>
            <span className="bar"></span>
          </div>
          <div className="group">
            <input type="password" className="mag-form" name="passwordFieldConfirm" placeholder="confirm password" />
            <span className="highlight"></span>
            <span className="bar"></span>
          </div>
          <button type="submit" className="loginbut"><img src="../../images/tree-576846_1280.png" className="loginlog" /><span className="label loginarrow_box">Start identifying</span></button>
        </form>
      </div>
    )
  },

  _handleNewUser: function (evt) {
    evt.preventDefault()
    let formEl = evt.target
    // if (formEl.usernameField.value !== formEl.passwordField.value){
    //   formEl.passwordmsg.value = "passwords must match"
    // }

    let formValsObj = {
      email: formEl.usernameField.value,
      password: formEl.passwordField.value,
      confirmPassword: formEl.passwordFieldConfirm.value
    }


    ACTIONS.registerNewUserM(formValsObj)

  }
})
