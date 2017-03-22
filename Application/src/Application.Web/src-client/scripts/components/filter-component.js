import React from 'react'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {CodeModel, CodeCollection} from '../models/code-model.js'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'
import {BROWSE_ACTIONS} from '../browse_actions.js'


export const FilterComponent = React.createClass({





  _handleFilterSelect: function(evt){

    let filterChar = evt.currentTarget.dataset.code
    let FilterList = this.props.filterChars
    // console.log(this.props.categorySelect)
    // console.log(this.props.characteristicSelect)
  BROWSE_ACTIONS.changeFilter(filterChar)

},

render: function(){
  let self = this
  if(this.props.categories.BARK === undefined){
    return(
      <div></div>
    )
  } else {
    let currentCat = this.props.categorySelect
    let currentChar = this.props.characteristicSelect
    // console.log(this.props)
    // console.log(this.props.categories.currentCat.currentChar)
    //
    let characteristics = this.props.categories[currentCat]
    let states = []
    for (let i = 0, len = characteristics.length; i < len; i++) {
      let c = characteristics[i];
      if (c.characteristic === currentChar) {
        states = c.states
      }
    }

    let stateJSX = states.map(function(obj,i){
      return(

          <div onClick={self._handleFilterSelect} data-code={obj.code} key={i}><a>{obj.state}</a></div>
          )
        })


    console.log(this.props)

    return(
      <div>
        <h4>Filters</h4>
        <div>{stateJSX}</div>
      </div>
      // <div>
      // <h4>Filters</h4>
      //
      //
      //       <div className="checkbox"  onChange={this._handleFilterSelect}>
      //           <label><input type="checkbox" value="all"/>All</label>
      //         </div>
      //       <div className="checkbox" onChange={this._handleFilterSelect}>
      //           <label><input type="checkbox" value="Aa"/>simple</label>
      //         </div>
      //       <div className="checkbox" onChange={this._handleFilterSelect}>
      //           <label><input type="checkbox" value="Ab"/>compound</label>
      //         </div>
      //     </div>



        )
}
  }


})
