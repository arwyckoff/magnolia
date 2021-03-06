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
    scroll(0,0)
    ACTIONS.changeCategory("LEAF")
    ACTIONS.changeCharacteristic("leaf type")
    let component = this;


  },


  render: function () {
    return (
      <div className="browseCompContainer">
        <div className="browseHeader">
          <h1>BROWSE</h1>
        </div>
        <div className="container row">
          <div className="col-sm-2">
            <CategoryComponent {...this.state} />
          </div>
          <div className="col-sm-2">
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
