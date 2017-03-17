import React from 'react'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'

export const FilterComponent = React.createClass({


  _handleFilterSelect: function(evt){
    evt.preventDefault()
    let formEl = evt.target
    let filterChar = formEl.leafType.value
      // console.log(filterChar)
    ACTIONS.changeFilter(filterChar)

    // console.log(this.props)

},

render: function(){

  return(
    <div>
    <h4>Characteristics</h4>

          <div className="MG-md-6-of-12 MG-form-group field_leaf_type" >
            <strong><label>Leaf Type</label></strong>
            <form onSubmit={this._handleFilterSelect}>
            <select name = "leafType">
            <option default></option>
              <option value = "simple">simple</option>
              <option value = "pinnately-compound">pinnately compound</option>
              <option value = "bipinnately-compound">bipinnately compound</option>
              <option value = "palmately-compound">palmately compound</option>
              <option value = "trifoliolately-compound">trifoliolately compound</option>
            </select>
            <button className="btn btn-block btn-success btn-lg" type="submit">Submit</button>
          </form>
          </div>
        </div>

)}

})
