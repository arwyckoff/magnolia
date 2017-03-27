import React from 'react'
import $ from 'jquery'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'

export const ProfileComponent = React.createClass({

_handleImageLoad: function(evt){

  setTimeout(() => {
    ACTIONS.changeReadyState("ready", true);
  }, 1250);

},

_handleUserCollection: function(evt){
  let plantToAdd = STORE.getStoreData().myTree
  let userInfo = STORE.getStoreData().currentUser
  if (userInfo.id !== null){
  userInfo.plants.push(plantToAdd)
  STORE.setStore('userProfile', userInfo)
}
},
_handleWikiClick: function(){
  let wikiPart = 'https://en.wikipedia.org/wiki/'
  let latinPart = this.props.myWiki.latinName
  let wholeLink = `${wikiPart}${latinPart}`
  console.log(wholeLink)
  return wholeLink
},

   render: function(){
      let self = this
      let allTheTrees = this.props.myTree
      if (this.props.myWiki.description === 'Wikipedia disambiguation page' || this.props.myWiki.description ==='Wikimedia disambiguation page' || this.props.myWiki ===''){
        return (
          <div className = "profile-page">
          <div className = "tree-profile">
             <ProfileCategoryItem profileData={allTheTrees}/>

          </div>
        </div>
        )
      }
      else {
      return (
        <div className = "profile-page">
        <div className = "tree-profile">
           <ProfileItem profileData={allTheTrees}/>
           <div className = "profile-half">
                <img onLoad ={this._handleImageLoad} className = "plant-pic" src = {this.props.myImage}/>
                <p> {this.props.myWiki}</p>
                 <a href = {this.props.wikiLink} target = '_blank'>read more</a>
                <p style={{clear: 'both'}}></p>
        </div>
        <a className = "user-add" onClick = {this._handleUserCollection} data-id = {this.props.myTree}>add to my collection</a>
      </div>
    </div>
      )
    }
   }
})

export const ProfileItem = React.createClass ({

   render: function(){
     let self = this
     if (this.props.profileData.secondaryName !== '')
      {return (
        <div className = "container-tree" >
          <h3>{this.props.profileData.commonName} <em>{this.props.profileData.latinName}</em></h3>
          <p>also known as: {this.props.profileData.secondaryName}</p>
       </div>
     )}
     else {return(
         <div className = "container-tree" >
           <h3>{this.props.profileData.commonName} <em>{this.props.profileData.latinName}</em></h3>
        </div>
      )}
   }
})

export const ProfileCategoryItem = React.createClass ({

   render: function(){
     let self = this

      return (
        <div className = "container-tree container-disambigution" >

          <h3>{this.props.profileData.commonName} <em>{this.props.profileData.latinName}</em></h3>
          <p>also known as: {this.props.profileData.secondaryName}</p>
            <div>
                <ul> this plant does not have a wiki disambiguation page
                  <li>some tree charactertics will go here</li>
                  <li>some tree charactertics will go here</li>
                </ul>
            </div>
       </div>

     )
   }
})

export const GenusComponent = React.createClass({
  getInitialState: function () {
    return STORE.getStoreData()
  },

  _makeTreeComponents: function (treeList) {
    let arrayOfTreeComponents = treeList.map(
      (smod, i) => {
        return (
          <GenusItem treeData={smod} key={i} />
        )
      }
    )
    return arrayOfTreeComponents
  },

  render: function () {
    return (
      <div className="genus-container">
        <h4> Other trees in Genus <em>{this.props.genus}</em></h4>
        {this._makeTreeComponents(this.props.genusTrees)}
      </div>
    )
  }
})

export const GenusItem = React.createClass({

  _handleGenusProfClick: function(evt){
    evt.preventDefault()
    let profileEl = evt.currentTarget
    let id = this.props.treeData.id
    let latinName = this.props.treeData.latinName
    let latinRoute = `tree/${latinName}`
    let latinGenus = latinName.split(' ')
    let latinGenusWord = latinGenus[0]
    STORE.setStore('genus', latinGenusWord)
    ACTIONS.fetchProfileStuff(latinGenusWord, latinName)
    STORE.setStore('myImage', '')
  },
   render: function(){

      return (

        <div className = "genus-box" onClick = {this._handleGenusProfClick}>
              <p className= "single-tree">{this.props.treeData.commonName}</p>
              <p><em>{this.props.treeData.latinName}</em></p>

       </div>
      )
   }
})
