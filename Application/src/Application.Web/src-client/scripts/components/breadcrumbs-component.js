import React from 'react'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {CodeModel, CodeCollection} from '../models/code-model.js'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'
import {BROWSE_ACTIONS} from '../browse_actions.js'
import {CATEGORIES} from '../utils/categories.js'
import {_handleFilterSelect} from "./filter-component.js"


export const BreadcrumbsComponent = React.createClass({


  _handleResetButtonSelect: function(){
    BROWSE_ACTIONS.changeFilter("all")
  },


  _handleBreadcrumbSelect: function(evt){
        let filterChar = evt.currentTarget.dataset.code
        BROWSE_ACTIONS.changeFilter(filterChar)
},

render: function(){

  let codeListObj = this.props.filterChars

  let selectedCodeObj = codeListObj.map(
    (obj,i) => {
      return <div
               className='item' key={i}>{this.props.codeList[obj].state}
            <i onClick={this._handleBreadcrumbSelect}
              data-code={this.props.codeList[obj].code} className="fa fa-times-circle makeHand" aria-hidden="true"></i>
            </div>
    }
  )

  // console.log('selected: ', selectedCodeObj)

  return(
    <div>
      <div className="breadCrumbHeadContainer">
          <h4 className="breadCrumbHeader selected">Selected Filters</h4>
          <h4 onClick={this._handleResetButtonSelect} className="breadCrumbHeader reset">Reset</h4>
      </div>
          <div className="container filterContainer">

      <div >{selectedCodeObj} </div>
    </div>
  </div>


    )
  }
})
