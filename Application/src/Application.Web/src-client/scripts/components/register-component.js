import React from 'react'
import {ACTIONS} from '../actions.js'
import {UserModel} from '../models/model-user.js'

export const RegisterComponent = React.createClass({
  getInitialState: function(){
    return{
      imgPreviewLink: 'http://placehold.it/350x150?text=image+preview'
    }
  },
  _handlePreviewClick: function(evt){
    evt.preventDefault()
    let imgDomEl =  this.refs.imgPreviewEl
    if (imgDomEl.value.length>0){
      this.setState({
        imgPreviewLink: imgDomEl.value
      })
    }
      else{
        this.setState({
          imgPreviewLink: 'http://placehold.it/350x150?text=image+preview'
        })
      }
    },


    //
    // _validateEmail: function(formDomEl){
    //   let itemEl = formDomEl.usernameField
    //   let userNameValue = itemEl.value
    //   let flashMsgEl =
    // },
  render: function(){
    return(
      <div className = "auth-form">
        <h2> Register for an account</h2>
        <form onSubmit={this._handleNewUser}>
          <h4>Choose a username</h4>
          <input type = "text" className = "form-control" name = "usernameField" />
                <p className = "flash-msg"></p>
          <h4>Choose a unique password</h4>
          <input type = "password" className = "form-control" name = "passwordField" />
          <h4>confirm password</h4>
          <input type = "password" className = "form-control" name = "passwordFieldConfirm" />
          <h4> Add profile image</h4>
          <input type = "text" className = "form-control" name = "imgLinkField" ref="imgPreviewEl"/>
          <button onClick = {this._handlePreviewClick}
 					>Add Photo</button>
            <div href="#" >
                  <img src={this.state.imgPreviewLink} alt="no image found"/>
            </div>

            <button type="submit">Create Account</button>

        </form>


      </div>
    )
  },

  _handleNewUser: function(evt){
    evt.preventDefault()
    let formEl = evt.target
    let formValsObj = {
      email: formEl.usernameField.value,
      password: formEl.passwordField.value,
      confirmPassword: formEl.passwordFieldConfirm.value

    }
    ACTIONS.registerNewUserM(formValsObj)

}
})
