import Backbone from 'backbone'
import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
import {TreeListComponent} from '../components/tree-component.js'


export const LandingView = React.createClass({
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
    return(
      <div className = "container">
      </div>
    )
  }

})
