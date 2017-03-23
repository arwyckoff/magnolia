import React from 'react'
import {ACTIONS} from '../actions.js'
import {UserModel} from '../models/model-user.js'

export const RegisterComponent = React.createClass({
  // getInitialState: function(){
  //   return{
  //     imgPreviewLink: 'http://placehold.it/350x150?text=image+preview'
  //   }
  // },
  // _handlePreviewClick: function(evt){
  //   evt.preventDefault()
  //   let imgDomEl =  this.refs.imgPreviewEl
  //   if (imgDomEl.value.length>0){
  //     this.setState({
  //       imgPreviewLink: imgDomEl.value
  //     })
  //   }
  //     else{
  //       this.setState({
  //         imgPreviewLink: 'http://placehold.it/350x150?text=image+preview'
  //       })
  //     }
  //   },

  render: function(){
    return(
      <div className = "hero">

      <div className = "auth-form register-box">
        <form onSubmit={this._handleNewUser}>
          <p>Choose a username</p>
          <input type = "text" className = "form-control" name = "usernameField" />
                <p className = "flash-msg"></p>
          <p>Choose a unique password</p>
          <input type = "password" className = "form-control" name = "passwordField" />
          <p>confirm password</p>
          <input type = "password" className = "form-control" name = "passwordFieldConfirm" />
          {/* <h4> Add profile image</h4>
          <input type = "text" className = "form-control" name = "imgLinkField" ref="imgPreviewEl"/>
                          <label className = "password-flash-msg" name = "passwordmsg"></label>
          <button onClick = {this._handlePreviewClick}
 					>Add Photo</button>
            <div href="#" >
                  <img src={this.state.imgPreviewLink} alt="no image found"/>
            </div> */}

            <button type="submit">Create Account</button>

        </form>

      </div>
    </div>

    )
  },

  _handleNewUser: function(evt){
    evt.preventDefault()
    let formEl = evt.target
    if (formEl.usernameField.value !== formEl.passwordField.value){
      formEl.passwordmsg.value = "passwords must match"
    }
    else {
    let formValsObj = {
      email: formEl.usernameField.value,
      password: formEl.passwordField.value,
      confirmPassword: formEl.passwordFieldConfirm.value

    }
    ACTIONS.registerNewUserM(formValsObj)

}}
})
