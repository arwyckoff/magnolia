import Backbone from 'backbone'
import React from 'react'
import {ACTIONS} from '../actions.js'
import {BROWSE_ACTIONS} from '../browse_actions.js'
import {STORE} from '../store.js'
import {TreeListComponent} from '../components/tree-component.js'
import {FilterComponent} from '../components/filter-component.js'


export const BrowseView = React.createClass({
  getInitialState: function(){
    return STORE.getStoreData()
  },

  componentWillMount: function(){
    let component = this;

    // STORE.onStoreChange(function(){
    //   component.setState( STORE.getStoreData() )
    // })

    // console.log("FECTHY FETCH??")
    // ACTIONS.fetchAllTrees()

  },



  render: function(){
// console.log("hello")
    return(
      <div>
        <h1>BROWSE</h1>
      <div className= "container">
        <FilterComponent {...this.state}/>

        <TreeListComponent {...this.state}/>
      </div>
    </div>
    )
  }

})
