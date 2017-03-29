import React from 'react'
import {ACTIONS} from '../actions.js'
import {UserModel} from '../models/model-user.js'

export const LogoutComponent = React.createClass({

  _handleLogout: function(evt){
    evt.preventDefault()

    ACTIONS.logoutUser()
  },

  render: function(){
      return (
         <div className="auth-form logout-box">
				<form onSubmit = {this._handleLogout}>
	            <button type="submit">confirm log out</button>
				</form>

			</div>
      )
   }
})
