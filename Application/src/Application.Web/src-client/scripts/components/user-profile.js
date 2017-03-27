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
     if (  this.state.userProfile.plants!==null && this.state.userProfile.plants.length >0 ){
      //  let userJsx =  this._makeUserComponents(this.props.currentUser.plants)
       return (
         <div className = "user-container">
           <h3>Username: {this.props.userProfile.userName}</h3>
           <h3 className = "make-green">MY TREES</h3>
           {this._makeUserComponents(this.state.userProfile.plants)}
         </div>
      )
      }
      else {
      return(
        <div className = "user-container">
          <h3>Username: {this.state.userProfile.userName}</h3>
          <h4>You don't have any plants in your profile. <a onClick = {this._handleBrowse}>add some!</a></h4>
      </div>

        )
  }
    }
})

export const UserItem = React.createClass({
  render: function(){
    return(
        <div className = "tree-one">
             <p className= "one-tree">{this.props.userData.commonName}</p>
        </div>
      )
  }
})
