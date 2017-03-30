import React from 'react'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'

export const UserProfileComponent = React.createClass({
  getInitialState: function(){
   return STORE.getStoreData()
  },
  _handleBrowse: function(){
    ACTIONS.changeCurrentNav('BROWSE', 'browse')
  },
  _makeUserComponents: function (plantList) {
      let arrayOfTreeComponents = plantList.map(
        (smod, i) => {
          return (
            <UserItem userData={smod} key={i} />
          )
        }
      )
      return arrayOfTreeComponents
    },
   render: function(){

     if ( this.props.userProfile.plants!==null && this.props.userProfile.plants !== undefined && this.props.userProfile.plants.length >0 ){
      //  let userJsx =  this._makeUserComponents(this.props.currentUser.plants)
       return (
         <div className = "user-container">
           <h3 className = "username-head ">{this.props.userProfile.userName}</h3>
           <h3 className = "tree-head">My Collection</h3>
           {this._makeUserComponents(this.props.userProfile.plants)}
         </div>
      )
      }
      else {
      return(
        <div className = "user-container">
          <h3>Username: {this.props.userProfile.userName}</h3>
          <h4>You don't have any plants in your profile. <a onClick = {this._handleBrowse} className = "landing-link">add some!</a></h4>
      </div>

        )
  }
    }
})

export const UserItem = React.createClass({
  _handleProfClick: function (evt) {
    evt.preventDefault()
        ACTIONS.changeReadyState(false)
    let latinName = this.props.userData.plant.latinName
    let latinRoute = `tree/${latinName}`
    ACTIONS.changeCurrentNav('PROFILE', latinRoute)
  },
  render: function(){
    return(
        <div className = "tree-user-container" onClick = {this._handleProfClick}>
             <p className= "tree-user-name">{this.props.userData.plant.commonName}
            <em> {this.props.userData.plant.latinName}</em></p>
           <br/><p className = 'field-notes'><span>field notes:</span>{this.props.userData.comment}</p>
        </div>
      )
  }
})
