import React from 'react'
import $ from 'jquery'
import { TreeModel, TreeCollection } from '../models/tree-model.js'
import { STORE } from '../store.js'
import { ACTIONS } from '../actions.js'

export const ProfileComponent = React.createClass({
  _handleImageLoad: function (evt) {
    setTimeout(() => {
      ACTIONS.changeReadyState(true);
    }, 1250);
  },

  _handleUserCollection: function (evt) {
      STORE.setStore('popupShow', true)
  },

  _handleWikiClick: function () {
    let wikiPart = 'https://en.wikipedia.org/wiki/'
    let latinPart = this.props.myWiki.latinName
    let wholeLink = `${wikiPart}${latinPart}`
    console.log(wholeLink)
    return wholeLink
  },
  render: function () {
    let self = this
    let allTheTrees = this.props.myTree
    if (this.props.myWiki.description === 'Wikipedia disambiguation page' || this.props.myWiki.description === 'Wikimedia disambiguation page' || this.props.myWiki === '') {
      return (
        <div className="profile-page">
          <div className="tree-profile">
            <ProfileCategoryItem profileData={allTheTrees} />

          </div>
        </div>
      )
    }
    else {
      return (
        <div className="profile-page">
          <div className="tree-profile">
            <ProfileItem profileData={allTheTrees} />
            <div className="profile-half">
              <div className="profile-image-container">
                <img onLoad={this._handleImageLoad} className="plant-pic" src={this.props.myImage} />
              </div>
              <p> {this.props.myWiki}</p>
              <p style={{ clear: 'both' }}></p>
              </div>
              <div className="container profile-wiki-add">
                <a className="item" href={this.props.wikiLink} target='_blank'>read more on Wikipedia</a>
                {/* <a className="no-mouse-effect">|</a> */}
                <a className="item user-add" onClick={this._handleUserCollection} data-id={this.props.myTree}>add to my collection</a>
              </div>
          </div>
        </div>
      )
    }
  }
})

export const ProfileItem = React.createClass({

  render: function () {
    let self = this
    if (this.props.profileData.secondaryName !== '') {
      return (
        <div className="container-tree" >
          <h3>{this.props.profileData.commonName} <em>{this.props.profileData.latinName}</em></h3>
          <p>also known as: {this.props.profileData.secondaryName}</p>
        </div>
      )
    }
    else {
      return (
        <div className="container-tree" >
          <h3>{this.props.profileData.commonName} <em>{this.props.profileData.latinName}</em></h3>
        </div>
      )
    }
  }
})

export const ProfileCategoryItem = React.createClass({

  render: function () {
    let self = this

    return (
      <div className="container-tree container-disambigution" >

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

  _handleGenusProfClick: function (evt) {
    evt.preventDefault()
    ACTIONS.changeReadyState(false)
    scroll(0,0)
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
  render: function () {

    return (

      <div className="genus-box hvr-trim makeHand" onClick={this._handleGenusProfClick}>
        <p className="single-tree">{this.props.treeData.commonName}</p>
        <p><em>{this.props.treeData.latinName}</em></p>
      </div>
    )
  }
})
export const AddTreeComponent = React.createClass({
  _handleProfileAdd: function (evt) {
    let formEl = evt.target
    let inputComment = formEl.commentField.value
    let newObject = {}
    newObject.plantId = this.props.myTree.id
    newObject.comment = inputComment
      ACTIONS.updateUserPlants(newObject)
      ACTIONS.changeCurrentNav('MYPROFILE', 'my-profile')
  },
_handleCloseOut: function(){
        STORE.setStore('popupShow', false)
},
  render: function(){
    return(
      <div className = "add-tree">
        <div className = "make-relative">
        <form onSubmit = {this._handleProfileAdd}>
          <p className = "tree-name">{this.props.myTree.commonName}<br/><span>
        <em>{this.props.myTree.latinName}</em></span></p>
          <p className = "field-input">field notes</p>
          <textarea maxLength='150' name="commentField"></textarea>
          <button type = "submit">Add to my collection</button>
        </form>
  <i className="fa fa-times-circle make-pink make-cursor x-cornor" aria-hidden="true" onClick = {this._handleCloseOut}></i>
</div>
      </div>
    )
  }
})
