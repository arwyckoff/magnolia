import Backbone from 'backbone'
import React from 'react'
import { ACTIONS } from '../actions.js'
import { BROWSE_ACTIONS } from '../browse_actions.js'
import { STORE } from '../store.js'
import { TreeListComponent } from '../components/tree-component.js'
import { FilterComponent } from '../components/filter-component.js'
import { CategoryComponent } from '../components/category-component.js'
import { BreadcrumbsComponent } from "../components/breadcrumbs-component.js"
import { CharacteristicComponent } from '../components/characteristic-component.js'


export const BrowseView = React.createClass({
  getInitialState: function () {
    return STORE.getStoreData()
  },

  componentWillMount: function () {
    ACTIONS.changeCategory("LEAF")
    ACTIONS.changeCharacteristic("leaf type")
    let component = this;

    // STORE.onStoreChange(function(){
    //   component.setState( STORE.getStoreData() )
    // })

    // console.log("FECTHY FETCH??")
    // ACTIONS.fetchAllTrees()

  },


  render: function () {
    return (
      <div className="browseCompContainer">
        <div className="browseHeader">
          <h1>BROWSE</h1>
        </div>
        <div className="container row">
          <div className="col-sm-1">
            <CategoryComponent {...this.state} />
          </div>
          <div className="col-sm-3">
            <CharacteristicComponent {...this.state} />
          </div>
          <div className="col-sm-2">
            <FilterComponent {...this.state} />
          </div>
          <div className="col-sm-6">
            <BreadcrumbsComponent {...this.state} />
            <TreeListComponent {...this.state} />
          </div>
        </div>
      </div>
    )
  }

})
