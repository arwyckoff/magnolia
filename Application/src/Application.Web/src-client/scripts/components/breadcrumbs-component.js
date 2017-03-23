import React from 'react'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {CodeModel, CodeCollection} from '../models/code-model.js'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'
import {BROWSE_ACTIONS} from '../browse_actions.js'
import {CATEGORIES} from '../utils/categories.js'
import {_handleFilterSelect} from "./filter-component.js"


export const BreadcrumbsComponent = React.createClass({

  _handleBreadcrumbSelect: function(evt){

    console.log("hey")
    let filterChar = evt.currentTarget.dataset.code
    // let FilterList = this.props.filterChars
    // console.log(this.props.categorySelect)
    // console.log(this.props.characteristicSelect)
  BROWSE_ACTIONS.changeFilter(filterChar)
},

render: function(){
  // console.log(this.props)
  // console.log(this.props)
  //
  let codeListObj = this.props.filterChars

  let selectedCodeObj = codeListObj.map(
    (obj,i) => {
      return <a
               className='item' key={i}>{this.props.codeList[obj].state}
            <i onClick={this._handleBreadcrumbSelect}
              data-code={this.props.codeList[obj].code} className="fa fa-times-circle" aria-hidden="true"></i>
            </a>
    }
  )

  // console.log('selected: ', selectedCodeObj)

  return(
    <div>
    <h4 className="breadCrumbHeader">Selected Filters</h4>
    <div className="container filterContainer">

      <div >{selectedCodeObj} </div>
    </div>
  </div>


    )
  }
})
