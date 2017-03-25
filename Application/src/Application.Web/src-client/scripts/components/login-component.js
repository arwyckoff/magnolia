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

                <img className = "hero-img" src = '../../images/jon-flobrant-42709.jpg'/>

            <div className="auth-form login-box">
 				       <form onSubmit = {this._handleLogin}>
                    <div className = "group">
 					            <input type="text" className="form-control" name="emailField" placeholder="Email"/>
                          <span className="highlight"></span>
                          <span className="bar"></span>
                      </div>
                      <div className = "group">
 	                    <input type="password" className="form-control" name="passwordField" placeholder= "Password"/>
                          <span className="highlight"></span>
                          <span className="bar"></span>
                      </div>
                 <button type="submit" className = "loginbut"><img src = "../../images/tree-576846_1280.png" className = "loginlog"/><span className="label loginarrow_box">LOG in</span></button>
 				       </form>
			     </div>
         </div>

      )
   }
})
