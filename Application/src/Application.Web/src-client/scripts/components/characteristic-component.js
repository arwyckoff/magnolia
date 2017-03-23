import React from 'react'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {CodeModel, CodeCollection} from '../models/code-model.js'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'
import {BROWSE_ACTIONS} from '../browse_actions.js'
import {CATEGORIES} from '../utils/categories.js'


export const CharacteristicComponent = React.createClass({

  componentDidMount: function (){



  },

  _handleCharSelect: function(evt){

    let charClicked = evt.currentTarget.dataset.cat
    ACTIONS.changeCharacteristic(charClicked)


  },

  // _handleHEY:function(evt){
  //
  //   console.log("hey")
  // }


render: function (){
  let self = this
  if(this.props.categories.BARK === undefined){
    return(
      <div></div>
    )
  }

    let characteristics = this.props.categories[this.props.categorySelect]

    let charJSX = characteristics.map(function(obj,i){
      if(obj.characteristic === self.props.characteristicSelect){
      return <div className="filter active" onClick={self._handleCharSelect} data-cat={obj.characteristic} key={i}><a>{obj.characteristic}</a></div>
    } else {
      return <div className="filter" onClick={self._handleCharSelect} data-cat={obj.characteristic} key={i}><a>{obj.characteristic}</a></div>
            }
        }
      )

  return (

    <div>
      <h4>Characteristics</h4>
      {charJSX}
    </div>


    )
  }
})
