import Backbone from 'backbone'
import React from 'react'
import {ACTIONS} from '../actions.js'
import {BROWSE_ACTIONS} from '../browse_actions.js'
import {STORE} from '../store.js'
import {TreeListComponent} from '../components/tree-component.js'
import {FilterComponent} from '../components/filter-component.js'
import {CategoryComponent} from '../components/category-component.js'
import {CharacteristicComponent} from '../components/characteristic-component.js'


export const BrowseView = React.createClass({
  getInitialState: function(){
    return STORE.getStoreData()
  },

  componentWillMount: function(){
    ACTIONS.changeCategory("LEAF")
    ACTIONS.changeCharacteristic("leaf type")
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
      <div className= "container-fluid row">
        <div className="col-xs-2">
        <CategoryComponent {...this.state}/>
      </div>
      <div className="col-xs-2">
        <CharacteristicComponent {...this.state}/>
      </div>
        <div className="col-xs-2">
        <FilterComponent {...this.state}/>
      </div>
      <div className="col-xs-6">
        <TreeListComponent {...this.state}/>
        </div>
      </div>
    </div>
    )
  }

})
