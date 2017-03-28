import React from 'react'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {CodeModel, CodeCollection} from '../models/code-model.js'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'
import {BROWSE_ACTIONS} from '../browse_actions.js'
import {ID_ACTIONS} from '../id-actions.js'

export const IdBreadcrumbsComponent = React.createClass({
  getInitialState: function(){
    return STORE.getStoreData()
  },

  _handleResetButtonSelect: function(){
    ID_ACTIONS.resetIDProps()
  },


  _handleBreadcrumbSelect: function(evt){
        let filterChar = evt.currentTarget.dataset.code
        BROWSE_ACTIONS.changeFilter(filterChar)
        ID_ACTIONS.updateQuestionBack(this.props.categorySelect)
},
_handleBack: function(evt){
  if (this.props.currentQuestion >2 && this.props.filterChars.length>0){
    let filterChars = this.props.filterChars
    let lastFilter = filterChars[filterChars.length-1]
    BROWSE_ACTIONS.changeFilter(lastFilter)
  ID_ACTIONS.updateQuestionBack(this.props.categorySelect)
}
else if (this.props.currentQuestion>2 && this.props.filterChars.length ===0){
ID_ACTIONS.updateQuestionBack(this.props.categorySelect)
}
else {ID_ACTIONS.resetIDProps()}
},

render: function(){

  let codeListObj = this.props.filterChars
if (this.props.filterChars.length >0){
  let selectedCodeObj = codeListObj.map(
    (obj,i) => {
      return <div

               className='item-bc' key={i}>
               {this.props.codeList[obj].state}

            <i onClick={this._handleBreadcrumbSelect}
              data-code={this.props.codeList[obj].code} className="fa fa-times-circle make-pink makeHand" aria-hidden="true"></i>
            </div>
    }
  )
  return(
    <div>
      <div className="id-bc-container">
  <i className="fa fa-chevron-left makeHand make-pink make-button" aria-hidden="true" onClick = {this._handleBack}>Back</i>
          <h4 className="filter-select selected">Selected Filters</h4>
          <div className=" select-container">

      <div >{selectedCodeObj} </div>
    </div>
          <h4 onClick={this._handleResetButtonSelect} className="reset-btn reset hvr-grow">Reset</h4>
      </div>

  </div>


    )
  }
  else if (this.props.currentQuestion >1){return(
    <div>

            <i className="fa fa-chevron-left makeHand make-pink make-button" aria-hidden="true" onClick = {this._handleBack}>Back</i>

    </div>
  )}
  else {return (<div></div>)}
}
})
