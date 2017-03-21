import Backbone from 'backbone'
import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
import {TreeProfileComponent} from '../components/tree-profile-component.js'


export const HomeView = React.createClass({
  getInitialState: function(){
    return STORE.getStoreData()
  },

  componentDidMount: function(){
    let component = this;

    // ACTIONS.fetchAllTrees()
    // ACTIONS.fetchOneTree(this.props.treeListData)
  },

  render: function(){
    return(
      <div className = "container">
        <h1>hey!</h1>
        <TreeProfileComponent {...this.props}/>
      </div>
    )
  }

})
