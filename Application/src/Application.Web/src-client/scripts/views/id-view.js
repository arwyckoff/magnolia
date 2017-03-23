import Backbone from 'backbone'
import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
import {IdCategoryComponent} from '../components/id-component.js'
import {CharacteristicComponent} from '../components/characteristic-component.js'
import {TreeListComponent} from '../components/tree-component.js'
import {FilterComponent} from '../components/filter-component.js'


export const IdentifyView = React.createClass({
  getInitialState: function(){
    return STORE.getStoreData()
    console.log(this.props)
  },


  componentDidMount: function(){
    let component = this

  },

  render: function(){
    return(
      <div className = "profile-container">
        <IdCategoryComponent {...this.props}/>

        {/* <QuestionComponent {...this.props}/> */}
        {/* <FilterComponent {...this.props}/> */}
        {/* <TreeListComponent {...this.props}/> */}
      </div>
    )
  }

})
