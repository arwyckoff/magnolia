import React from 'react'
import { TreeModel, TreeCollection } from '../models/tree-model.js'
import { CodeModel, CodeCollection } from '../models/code-model.js'
import { STORE } from '../store.js'
import { ACTIONS } from '../actions.js'
import { BROWSE_ACTIONS } from '../browse_actions.js'
import { CATEGORIES } from '../utils/categories.js'


export const CharacteristicComponent = React.createClass({
  _handleCharSelect: function (evt) {
    let charClicked = evt.currentTarget.dataset.cat
    ACTIONS.changeCharacteristic(charClicked)
  },

  render: function () {
    if (this.props.categories.BARK === undefined) {
      return (
        <div></div>
      )
    }

    let characteristics = this.props.categories[this.props.categorySelect]

    let charJSX = characteristics.map(
      (obj, i) => {
        let trimmed = obj.characteristic.replace(
          this.props.categorySelect.toLowerCase() + ' ',
          ''
        )
        if (obj.characteristic === this.props.characteristicSelect) {
          return <div className="filter filter-selected makeHand hvr-grow" onClick={this._handleCharSelect} data-cat={obj.characteristic} key={i}>{trimmed}</div>
        } else {
          return <div className="filter makeHand hvr-grow" onClick={this._handleCharSelect} data-cat={obj.characteristic} key={i}>{trimmed}</div>
        }
      }
    )

    return (

      <div>
        <h4 className="browse-header text-center">Characteristics</h4>
        {charJSX}
      </div>


    )
  }
})
