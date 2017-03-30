import React from 'react'
import { TreeModel, TreeCollection } from '../models/tree-model.js'
import { CodeModel, CodeCollection } from '../models/code-model.js'
import { STORE } from '../store.js'
import { ACTIONS } from '../actions.js'
import { BROWSE_ACTIONS } from '../browse_actions.js'
import { ID_ACTIONS } from '../id-actions.js'

export const IdBreadcrumbsComponent = React.createClass({
  getInitialState: function () {
    return STORE.getStoreData()
  },

  _handleResetButtonSelect: function () {
    ID_ACTIONS.resetIDProps()
  },

  _handleBreadcrumbSelect: function (evt) {
    let filterChar = evt.currentTarget.dataset.code
    BROWSE_ACTIONS.changeFilter(filterChar)
    ID_ACTIONS.updateQuestionBack(this.props.categorySelect)
  },

  _handleBack: function (evt) {
    if (this.props.currentQuestion > 2 && this.props.filterChars.length > 0) {
      let filterChars = this.props.filterChars
      let lastFilter = filterChars[filterChars.length - 1]
      BROWSE_ACTIONS.changeFilter(lastFilter)
      ID_ACTIONS.updateQuestionBack(this.props.categorySelect)
    } else if (this.props.currentQuestion > 2 && this.props.filterChars.length === 0) {
      ID_ACTIONS.updateQuestionBack(this.props.categorySelect)
    } else {
      ID_ACTIONS.resetIDProps()
    }
  },

  _makeBreadcrumbs: function (codeListObj) {
    return codeListObj.map(
      (obj, i) => {
        return <div
          onClick={this._handleBreadcrumbSelect}
          data-code={this.props.codeList[obj].code}  
          className='id-breadcrumb-item make-inline make-cursor' key={i}>
          {this.props.codeList[obj].state}
          <i className="fa fa-times-circle make-pink make-cursor add-pad" aria-hidden="true"></i>
        </div>
      }
    )
  },

  _makePreviousQuestion: function () {
    return <div className="id-reset make-cursor" onClick={this._handleBack}><i className="fa fa-chevron-left" aria-hidden="true"></i>Previous Question</div>
  },

  _makeResetButton: function () {
    return <div onClick={this._handleResetButtonSelect} className="id-reset make-cursor">reset filters</div>
  },

  render: function () {
    let codeListObj = this.props.filterChars
    if (this.props.filterChars.length > 0) {
      let selectedCodeObj = this._makeBreadcrumbs(codeListObj)
      return (
        <div className="id-breadcrumbs-container id-bc-styles">
          <div className="id-bc-reset-previous-container">
            {this._makePreviousQuestion()}
            {this._makeResetButton()}
          </div>
          <div className="id-filters-container">
            <div className="id-filters-heading">Selected Filters</div>
            <div className="id-breadcrumbs">
              {selectedCodeObj}
            </div>
          </div>
        </div>
      )
    } else if (this.props.currentQuestion > 1) {
      return (
        <div className="id-bc-reset-previous-container">
          {this._makePreviousQuestion()}
        </div>
      )
    }
    else { return (<div></div>) }
  }
})
