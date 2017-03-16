import React from 'react'
import Backbone from 'backbone'
import {STORE} from "../store.js"
import {ACTIONS} from "../actions.js"
import {TreeListComponent} from "../components/tree-component.js"

export const BrowseView = React.createClass({

  render: function(){

    return (
      <div>
        <h1>Congress People</h1>
        <hr/>
        <ProfileList someTress={this.props.treeLists}/>
      </div>
    )
  }
})

const ProfileList = React.createClass({
   _createTreeJSX: function(arrOfNames){

    let jsxArray = arrOfNames.map(function(treeObj){
      return <TreeItem treeData = {treeObj}/>
    })
    return jsxArray
  },
  render: function(){
    let treeList = this.props.someTrees;
    return (
      <div className = "congress-container">
        { this._createTreeJSX(treeList)  }
        </div>
    )
  }
})
