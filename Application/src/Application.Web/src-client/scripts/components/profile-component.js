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
        <div className = "profile-page">
        <div className = "tree-profile">
           <ProfileItem profileData={allTheTrees}/>
           <div className = "profile-half">
                <img src = {this.props.myImage}/>
            </div>
            <div className = "profile-half">
                <p> {this.props.myWiki}</p>
            </div>

        </div>
      </div>
      )
   }
})

export const ProfileItem = React.createClass({

   render: function(){
     let self = this


      return (
        <div className = "container-tree" >

          <h3>{this.props.profileData.commonName}({this.props.profileData.latinName})</h3>
          <p>also known as: {this.props.profileData.secondaryName}</p>

       </div>

     )
   }
})



export const GenusComponent = React.createClass({

  componentDidMount: function (){
    let self = this
  },

  _makeTreeComponents: function(treeList){
   let arrayOfTreeComponents = treeList.map(function(smod, i){
        return (
           <GenusItem treeData={smod} key={i}/>
        )
     })
   return arrayOfTreeComponents
 },

   render: function(){
      return (
        <div className = "genus-container">
          <h4> Other trees in Genus <em>{this.props.genus}</em></h4>
               {this._makeTreeComponents(this.props.genusTrees)}
        </div>
      )
    }
})

export const GenusItem = React.createClass({
  _handleProfClick: function(evt){
    evt.preventDefault()
    let profileEl = evt.currentTarget
    let id = this.props.treeData.id
    let latinName = this.props.treeData.latinName
    ACTIONS.changeCurrentNav ('PROFILE', latinName)
  },
   render: function(){

      return (

        <div className = "genus-box" onClick = {this._handleProfClick}>
          <img src = "http://placehold.it/200?text=add+wiki+image"/>
              <p className= "single-tree">{this.props.treeData.commonName}</p>
              <p><em>{this.props.treeData.latinName}</em></p>
       </div>
      )
   }
})
