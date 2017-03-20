import React from 'react'
import $ from 'jquery'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'

export const ProfileComponent = React.createClass({


   render: function(){
      let self = this
      let allTheTrees = this.props.myTree
      return (
        <div className = "tree-profile">
           <ProfileItem profileData={allTheTrees}/>
                <img src = {this.props.myImage}/>
                     <p> {this.props.myWiki}</p>

        </div>
      )
   }
})

export const ProfileItem = React.createClass({

   render: function(){
     let self = this


      return (
        <div className = "container-tree" >

          <h4>{this.props.profileData.commonName}({this.props.profileData.latinName})</h4>
          <p>also known as: {this.props.profileData.secondaryName}</p>

       </div>

     )
   }
})
