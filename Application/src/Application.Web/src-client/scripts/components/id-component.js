import React from 'react';
import {STORE} from '../store.js';
import {ACTIONS} from '../actions.js';
import {BROWSE_ACTIONS} from '../browse_actions.js'
import {ID_ACTIONS} from '../id-actions.js'
// import {_getFilteredCharacteristics} from '../utils/getFilteredCharacteristics.js';
// import {_getPreferredCharacteristics} from '../utils/getPreferredCharacteristics.js';
import  _getFilteredTrees  from "../utils/getFilteredTrees";

// import {_getLegalCharacteristics} from '../utils/getLegalCharacteristics.js';
// import {_getBestBetweenPreferredAndOtherwise} from '../utils/getMostCommonCharacteristic.js';

export const IdComponent = React.createClass({
  getInitialState: function(){
  return STORE.getStoreData()
},
componentWillMount: function(){
      STORE.setStore('currentQuestion', 1)
},
_makeQuestionComponents: function(categories){
  let keyNameJsx = Object.keys(categories).map(
    (smod, i) => {
    return         <QuestionItem questionData = {smod} key = {i}/>
    })
    return keyNameJsx
},
_makePartTwoComponents: function(statesArray){
    let stateJsx = statesArray.map(
      (keyName, i) => {
        let futurefiltChars = [...this.props.filterChars]
        futurefiltChars.push(keyName.code)
        let self = this
        let resultCount = _getFilteredTrees(futurefiltChars, this.props.filteredTrees).length
        let returnedTrees = _getFilteredTrees(futurefiltChars, this.props.filteredTrees)


        // unReturned.push(unReturned)
        let totalResults = resultCount++
        // if resultCount === 0 && this.props.filteredTrees.indexOf(keyName.code)
      return    <PartTwoItem partTwoData={keyName} results={resultCount} key = {i}/>
      })
    return stateJsx
  },
  _handleidontknow: function(evt){
    let catClicked = evt.currentTarget.dataset.cat
    let currentChar = evt.currentTarget.dataset.ch
    ID_ACTIONS.getNextBest(evt.currentTarget.dataset.cat, evt.currentTarget.dataset.ch)
  },

render: function(){
  let currentQuestion = this.props.currentQuestion
      let {categories} = this.props
      if (currentQuestion ===1 ){
        let questionStuff = this._makeQuestionComponents(categories)
        return (
          <div className = "question-box">
            <h4 className = "id-view-header">Choose part of plant to identify</h4>
            {questionStuff}
          </div>
        )}
  else if (currentQuestion > 1 && this.props.best.characteristic !== null){
          let stateStuff = this.props.best.characteristic.states
          let charStuff = this._makePartTwoComponents(stateStuff)
        return (
          <div className = "question-box">
            <h4>Choose best answer for {this.props.best.characteristic.characteristic}</h4>
          {charStuff}
          <div className = "question-card hvr-grow" data-ch= {this.props.best.characteristic.characteristic} data-cat={this.props.categorySelect} onClick = {this._handleidontknow}>
              <p>I don't know/skip</p><span><em>({this.props.filteredTrees.length} trees)</em></span>
            </div>
      </div>
    )
  }
  else if (this.props.filteredTrees > 0) {
        return (
          <div className = "question-box">
            <h4>We believe your tree is below</h4>
      </div>
    )}
    else {return(<div></div>)}
  }
  })

export const QuestionItem = React.createClass({
  _handleQuesSelect: function(evt){
    evt.preventDefault()
    let catClicked = evt.currentTarget.dataset.cat
    ID_ACTIONS.firstQuestionAction(evt.currentTarget.dataset.cat)
  },
    render: function (){
      let self = this
        return ( <div className = "question-card hvr-grow" data-cat={this.props.questionData} onClick = {this._handleQuesSelect}>
            <a>{this.props.questionData}</a>
            <img src ="http://placehold.it/200"/>
          </div>
        )
        }
})
export const PartTwoItem = React.createClass({

  _handleQuesSelect: function(evt){
    evt.preventDefault()
    let filterChar = evt.currentTarget.dataset.id
    let catClicked = evt.currentTarget.dataset.cat
    let currentChar = evt.currentTarget.dataset.ch
    ID_ACTIONS.updateQuestionInfo(evt.currentTarget.dataset.cat, evt.currentTarget.dataset.id, evt.currentTarget.dataset.ch)
  },

  render: function(){
  if (this.props.results === 1){
    return(
      <div className = "question-card hvr-grow" data-ch= {this.props.partTwoData.characteristic} data-cat={this.props.categorySelect} data-id = {this.props.partTwoData.code} onClick = {this._handleQuesSelect}>
          <p>{this.props.partTwoData.state}</p><span><em>({this.props.results} tree)</em></span>
        </div>
    )
  }
   if(this.props.results>1){
    return(
        <div className = "question-card hvr-grow" data-ch= {this.props.partTwoData.characteristic} data-cat={this.props.categorySelect} data-id = {this.props.partTwoData.code} onClick = {this._handleQuesSelect}>
            <p>{this.props.partTwoData.state}</p><span><em>({this.props.results} trees)</em></span>
          </div>
      )
  }
  if (this.props.results ===0){return   (
      <div></div>
        )
}}

})
