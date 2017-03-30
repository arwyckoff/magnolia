import React from 'react'
import { ACTIONS } from '../actions.js'
import { CATEGORIES } from '../utils/categories.js'

export const CategoryComponent = React.createClass({

  _handleCatSelect: function (evt) {
    let catClicked = evt.currentTarget.dataset.cat
    ACTIONS.changeCategory(catClicked)
  },

  render: function () {
    let { categories } = this.props
    let keyNamesJsx = Object.keys(categories).map(
      (keyName, i) => {
        if (keyName === this.props.categorySelect) {
          return <div className="filter filter-selected makeHand hvr-grow" onClick={this._handleCatSelect} key={i} data-cat={keyName}>{keyName.toLowerCase()}</div>
        } else {
          return <div className="filter makeHand hvr-grow" onClick={this._handleCatSelect} key={i} data-cat={keyName}>{keyName.toLowerCase()}</div>
        }
      }
    )

    return (
      <div>
        <h4 className="browse-header text-center">Categories</h4>
        {keyNamesJsx}
      </div>
    )
  }
})
