import React from 'react'
import { ACTIONS } from '../actions.js'
import { UserModel } from '../models/model-user.js'

export const RegisterComponent = React.createClass({


  render: function () {
    return (
      <div>
        <div className="auth-form register-box">
          <form onSubmit={this._handleNewUser}>
            <div className="group">
              {/* <p>choose a username</p> */}
              <input type="text" className="form-control" name="usernameField" placeholder="choose a username" />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <div className="group">
              {/* <p>choose a unique password</p> */}
              <input type="password" className="form-control" name="passwordField" placeholder="choose a unique password" />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <div className="group">
              {/* <p>confirm password</p> */}
              <input type="password" className="form-control" name="passwordFieldConfirm" placeholder="confirm password"  />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <button type="submit">Start Identifying</button>

          </form>

        </div>
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
