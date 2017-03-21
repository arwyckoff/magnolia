import React from 'react'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'
import {BROWSE_ACTIONS} from '../browse_actions.js'

export const FilterComponent = React.createClass({


  _handleFilterSelect: function(evt){

    let filterChar = evt.target.value
    let FilterList = this.props.filterChars

  BROWSE_ACTIONS.changeFilter(filterChar)

},

render: function(){

  return(
    <div>
    <h4>Characteristics</h4>

          <div className="MG-md-6-of-12 MG-form-group field_leaf_type" >
            <strong><label>Leaf Type</label></strong>

            <select name = "leafType" onChange={this._handleFilterSelect}>
            
              <option value = "all">All</option>
              <option value = "Aa">simple</option>
              <option value = "Ab">compound</option>
              <option value = "Gc">undulate</option>
              <option value = "Vg">not green or reddish</option>
            </select>

          </div>
        </div>


)}

})
