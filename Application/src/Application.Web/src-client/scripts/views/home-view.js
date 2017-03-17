import Backbone from 'backbone'
import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
import {TreeListComponent} from '../components/tree-component.js'
import {FilterComponent} from '../components/filter-component.js'


export const HomeView = React.createClass({
  getInitialState: function(){
    return STORE.getStoreData()
  },

  componentDidMount: function(){
    let component = this;

    STORE.onStoreChange(function(){
      component.setState( STORE.getStoreData() )
    })

    // console.log("FECTHY FETCH??")
    ACTIONS.fetchAllTrees()
ACTIONS.fetchMyWiki()
  },


  render: function(){
    return(
      <div className = "container">
        <h1>hey!</h1>
        <FilterComponent {...this.props}/>
        <TreeListComponent {...this.props}/>
      </div>
    )
  }

})
