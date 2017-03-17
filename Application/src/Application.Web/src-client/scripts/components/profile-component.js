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
        <div className = {this._getTreeCLassName}>
           <ProfileItem profileData={allTheTrees}/>
        </div>
      )
   }
})

export const ProfileItem = React.createClass({
  getInitialState: function(latinName:
  )
  STORE.setStore('latinName', this.props.profileData.latinName),
   render: function(){
     let self = this
     let allTheChars = this.props.profileData.characteristics
           let currentLatinName = this.props.profileData.latinName


      return (
        <div className = "container-tree" >
          <h4>{this.props.profileData.commonName}({this.props.profileData.latinName})</h4>
          <p>also known as: {this.props.profileData.secondaryName}</p>

       </div>

     ).bind(this)
   }
})
