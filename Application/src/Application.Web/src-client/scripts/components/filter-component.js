import React from 'react'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'
import {BROWSE_ACTIONS} from '../browse_actions.js'

export const FilterComponent = React.createClass({


  _handleFilterSelect: function(evt){

    let filterChar = evt.target.value
    let FilterList = this.props.filterChars
    let index = FilterList.indexOf(filterChar)

    if(index === -1){
  BROWSE_ACTIONS.changeFilter(filterChar)
  // console.log(index)
}
//     let NewFilterList = FilterList.splice(index, 1)
//     BROWSE_ACTIONS.changeFilter(NewFilterList)
// }
  // console.log(filterChar)

    // console.log(this.props)

},

render: function(){

  return(
    <div>
    <h4>Characteristics</h4>

          <div className="MG-md-6-of-12 MG-form-group field_leaf_type" >
            <strong><label>Leaf Type</label></strong>

            <select name = "leafType" onChange={this._handleFilterSelect}>
            <option default></option>

              <option value = "Aa">simple</option>
              <option value = "Gc">deciduous</option>
            </select>

          </div>
        </div>


)}

})
