import React from 'react'
import {STORE} from "../store.js"
import {ACTIONS} from "../actions.js"
import {TreeListComponent} from "../components/tree-component.js"

export const BrowseView = React.createClass({

getInitialState: function(){
  return STORE.getStoreData()
},

componentDidMount: function(){
   let component = this;
   STORE.onStoreChange(function(){
     component.setState( STORE.getStoreData() )
   })
   ACTIONS.fetchAllTrees()
 },

  render: function(){

    return (
      <div className ="container-browse">
      <h1>Browse</h1>
      <TreeListComponent treeListData={this.state.treeList}/>
      </div>

    )
  }


})
