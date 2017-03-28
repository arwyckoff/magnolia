import React from 'react';
import {STORE} from '../store.js';
import {ACTIONS} from '../actions.js';
import {BROWSE_ACTIONS} from '../browse_actions.js'
import {ID_ACTIONS} from '../id-actions.js'
// import {_getFilteredCharacteristics} from '../utils/getFilteredCharacteristics.js';
// import {_getPreferredCharacteristics} from '../utils/getPreferredCharacteristics.js';
import  _getFilteredTrees  from "../utils/getFilteredTrees"
import _getNextCategoryQuestion from "../utils/getNextCategoryQuestion.js"
// import {_getLegalCharacteristics} from '../utils/getLegalCharacteristics.js';
// import {_getBestBetweenPreferredAndOtherwise} from '../utils/getMostCommonCharacteristic.js';

export const IdComponent = React.createClass({
  getInitialState: function(){
    return STORE.getStoreData()
},
componentWillMount: function(){

},

_makeQuestionComponents: function(categories){
  let keyNameJsx = Object.keys(categories).map(
    (smod, i) => {
    return         <QuestionItem questionData = {smod} key = {i} allProps = {this.props}/>
    })
    return keyNameJsx
},

_makeAnswersComponent: function(answersArray, questionObj){
  let answersJsx = answersArray.map(
    (smod, i) => {
      // console.log(smod);
      return   <PhaseOneQuestionItem questionObjData = {questionObj} questionData = {smod} key = {i} allProps = {this.props}/>
    })
    return answersJsx
},

_makePartOneComponents: function(questions){
  let phaseOneQuestionJSX = questions.map(
    (smod, i) => {
      return   <PhaseOneQuestionItem questionData = {smod} key = {i}/>
    })
    return phaseOneQuestionJSX


},

_makePartTwoComponents: function(statesArray){
    let stateJsx = statesArray.map(
      (keyName, i) => {
        let futurefiltChars = [...this.props.filterChars]
        futurefiltChars.push(keyName.code)
        let self = this
        let resultCount = _getFilteredTrees(futurefiltChars, this.props.filteredTrees).length

      return    <PartTwoItem partTwoData={keyName} results={resultCount} key = {i}/>
      })
    return stateJsx
  },

_renderPhaseOne: function () {
  let currentCatSelect = this.state.categorySelect
  let phaseOneQuestions = this.props.allQuestions
  console.log(this.props)
  let catQuestionTrackerEl = this.props.catQuestionTracker[currentCatSelect]
  let catCodeArray = catQuestionTrackerEl["codeArray"]
  let questionObjArray = phaseOneQuestions[currentCatSelect]
  let nextQuestion = _getNextCategoryQuestion(questionObjArray, catCodeArray, this.props.answeredQuestions)
  let questionText = nextQuestion["question"]
  let answersArray = nextQuestion["answers"]
  let answerEls = this._makeAnswersComponent(answersArray, nextQuestion)

  return (
    <div className = "question-box">
      {questionText}
      {answerEls}
    </div>
  )
},

_renderCategoriesQuestion: function () {
  let questionStuff = this._makeQuestionComponents(this.props.categories)
  return (
    <div className = "question-box">
      <h4 className = "id-view-header">Choose part of plant to identify</h4>
      {questionStuff}
    </div>
  )
},

_renderPhaseTwo: function () {
  let stateStuff = this.props.best.characteristic.states
  let charStuff = this._makePartTwoComponents(stateStuff)
  return (
    <div className = "question-box">
    <h4>Choose best answer for {this.props.best.characteristic.characteristic}</h4>
      {charStuff}
    </div>
  )
},

_renderConfidence: function () {
  return (
    <div className = "question-box">
      <h4>We believe your tree is below</h4>
    </div>
  )
},

render: function(){
  let answeredQuestions = this.props.answeredQuestions
  let numberOfanseredQuestions = answeredQuestions.length
  let currentQuestion = this.props.currentQuestion

  if (numberOfanseredQuestions === 0) {
    return this._renderCategoriesQuestion()
  } else if (numberOfanseredQuestions > 0 && numberOfanseredQuestions < 2 && this.props.best.characteristic !== null){
    return this._renderPhaseOne()
  } else if (numberOfanseredQuestions >= 2 && this.props.best.characteristic !== null){
    return this._renderPhaseTwo()
  } else if (this.props.filteredTrees > 0) {
    return this._renderConfidence()
  } else {
    // ???? Something ain't right
    return(
      <div></div>
    )
  }
}})


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

export const PhaseOneQuestionItem = React.createClass({

  // _handleAnswerSelect:function(evt){
  //   evt.preventDefault()
  //   let answerClicked = evt.currentTarget.dataset.code
    // ID_ACTIONS.phaseOneQuestionAction(evt.currentTarget.dataset.code)
  // },
  _handlePhaseOneSelect:function(evt){

    let answerCode = evt.currentTarget.dataset.code
    let answerApply = evt.currentTarget.dataset.apply
    let questionText = evt.currentTarget.dataset.question
    let answerCat = this.props.allProps.categorySelect
    // let answerQuestion = this.dataset.question
    console.log(evt.currentTarget.dataset)
    console.log(this.props.questionData["answer"])
    ID_ACTIONS.answerPhaseOneAction(answerCat, answerCode, answerApply, questionText)
  },

    render: function(){
      let self = this
      // let currentCatSelect = this.state.categorySelect
      // let catQuestionTrackerEl = this.props.catQuestionTracker[currentCatSelect]
      // let catCodeArray = catQuestionTrackerEl["codeArray"]
      // let nextQuestionData = _getNextCategoryQuestion(questionObjArray, catCodeArray)
      // let questionElData = nextQuestionData["question"]

      let catAnswers = this.props.questionData["answer"]
      let catCode = this.props.questionData["code"]
      let catApply = this.props.questionData["apply"]
      let catDescription = this.props.questionData["description"]
      let totalFilterList = this.props.filterChars
      let question = this.props.questionObjData.question


        return (
          <div data-code={catCode} data-apply={catApply} data-question={question} onClick={this._handlePhaseOneSelect} className = "question-card hvr-grow">
            {catAnswers}
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
  else if(this.props.results>1){
    return(
        <div className = "question-card hvr-grow" data-ch= {this.props.partTwoData.characteristic} data-cat={this.props.categorySelect} data-id = {this.props.partTwoData.code} onClick = {this._handleQuesSelect}>
            <p>{this.props.partTwoData.state}</p><span><em>({this.props.results} trees)</em></span>
          </div>
      )
  }
  else if (this.props.results===0){
    return(
      <div className = 'bye'></div>
    )
  }
  }

})
