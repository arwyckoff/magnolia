import React from 'react';
import {STORE} from '../store.js';
import {ACTIONS} from '../actions.js';
import {BROWSE_ACTIONS} from '../browse_actions.js';
import {_getFilteredCharacteristics} from '../utils/getFilteredCharacteristics.js'
import {_getPreferredCharacteristics} from '../utils/getPreferredCharacteristics.js'
import _getFilteredTrees from '../utils/getFilteredTrees.js'
import {_getLegalCharacteristics} from '../utils/getLegalCharacteristics.js'
import {_getBestBetweenPreferredAndOtherwise} from '../utils/getMostCommonCharacteristic.js'

export const IdCategoryComponent = React.createClass({
  getInitialState: function(){
  ACTIONS.fetchAllTrees()
  ACTIONS.fetchAllCharCodes()
  ACTIONS.fetchAllCategories()
  return STORE.getStoreData()
},

  _handleCatSelect: function(evt){
    let catClicked = evt.currentTarget.dataset.cat
    ACTIONS.changeCategory(catClicked)
},
_makeQuestionItems: function(evt){
let legalArray = _getLegalCharacteristics(this.props.filterChars, this.props.iDKs, this.props.categories, 3)
let preferredCharObj = _getPreferredCharacteristics(legalArray, this.props.characteristicSelect)
console.log(preferredCharObj)
let commonArray = _getBestBetweenPreferredAndOtherwise(this.props.splitByPreference.preferred, this.props.splitByPreference.otherwise, this.props.filteredTrees, 3)
console.log(commonArray)
},
render: function (){

  let {categories} = this.props
  let keyNamesJsx = Object.keys(categories).map( (keyName,i) => {
    return(
      <div  className = "question-card"
        onClick={this._handleCatSelect}
        key={i} data-cat={keyName}>
        <a>{keyName.toLowerCase()}</a>
        <img src ="http://placehold.it/200"/>
      </div>
     )
  })
  return (

    <div className = "question-box" onClick = {this._makeQuestionItems}>
        <h4>Choose part of plant to identify</h4>
        {keyNamesJsx}
    </div>
  )
}
})
export const QuestionComponent = React.createClass({

  render: function(){
    // let preferredChars =  _getPreferredCharacteristics (this.props.categorySelect, this.props.categories)
    // let legalChars = _getLegalCharacteristics(this.props.filters, this.props.iDK, this.props.codeList, THRESHOLDS)
    // let filteredTrees = _getFilteredTrees(this.props.filterChars, this.props.filteredTrees)

    return(
  <h4>yo</h4>
)
  }

})
