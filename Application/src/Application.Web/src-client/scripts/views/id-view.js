import Backbone from 'backbone'
import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
import {IdComponent} from '../components/id-component.js'
import {CharacteristicComponent} from '../components/characteristic-component.js'
import {TreeIDComponent} from '../components/id-trees-component.js'
import {FilterComponent} from '../components/filter-component.js'
import {IdBreadcrumbsComponent} from '../components/id-breadcrumbs.js'
import {ID_ACTIONS} from '../id-actions.js'


export const IdentifyView = React.createClass({
  getInitialState: function(){
    return STORE.getStoreData()
  },
  render: function(){
    return (
      <div className = "question-container">
        <div className = "question-bc-container">
          <IdBreadcrumbsComponent {...this.state}/>
        </div>
        <div className = "question-top">
          <IdComponent {...this.state}/>
        </div>
        <div className = "question-tree-container">
          <TreeIDComponent {...this.state}/>
        </div>
      </div>
    )
  }
})
