import React from 'react'
import { STORE } from '../store.js'
import { ACTIONS } from '../actions.js'
import { BROWSE_ACTIONS } from '../browse_actions.js'
import { ID_ACTIONS } from '../id-actions.js'
import _getFilteredTrees from "../utils/getFilteredTrees"
import CATEGORY_IMAGES from '../utils/categoryImages.js'
import _getNextCategoryQuestion from "../utils/getNextCategoryQuestion.js"

export const IdComponent = React.createClass({
  getInitialState: function () {
    return STORE.getStoreData()
  },

  componentWillMount: function () {
    ID_ACTIONS.resetIDProps()
  },

  _makeQuestionComponents: function (categories) {
    let keyNameJsx = Object.keys(categories).map(
      (smod, i) => {
        return <QuestionItem questionData={smod} key={i} allProps={this.props} />
      }
    )
    return keyNameJsx
  },

  _makeAnswersComponent: function (answersArray, questionObj) {
    let answersJsx = answersArray.map(
      (smod, i) => {
        return <PhaseOneQuestionItem questionObjData={questionObj} questionData={smod} key={i} allProps={this.props} />
      }
    )
    return answersJsx
  },

  _makePartOneComponents: function (questions) {
    let phaseOneQuestionJSX = questions.map(
      (smod, i) => {
        return <PhaseOneQuestionItem questionData={smod} key={i} />
      }
    )
    return phaseOneQuestionJSX
  },

  _makePartTwoComponents: function (statesArray) {
    let stateJsx = statesArray.map(
      (keyName, i) => {
        let futurefiltChars = [...this.props.filterChars]
        futurefiltChars.push(keyName.code)
        let resultCount = _getFilteredTrees(futurefiltChars, this.props.filteredTrees).length
        return <PartTwoItem partTwoData={keyName} results={resultCount} key={i} />
      }
    )
    return stateJsx
  },

  _handleidontknow: function (evt) {
    let catClicked = evt.currentTarget.dataset.cat
    let currentChar = evt.currentTarget.dataset.ch
    ID_ACTIONS.getNextBest(evt.currentTarget.dataset.cat, evt.currentTarget.dataset.ch)
  },

  _makeGlossary: function (question) {
    if (question.description === "") {
      return <div className="bye"></div>
    }

    let questionDescription
    if (question.description !== "") {
      questionDescription = (
        <div className="glossary-item">
          <div className="glossary-term">
            General explanation
            <div className="glossary-line"></div>
          </div>
          <div className="glossary-definition">
            {question.description}
          </div>
        </div>
      )
    }

    let answerDescriptions = question.answers.map(
      (answerObj, i) => {
        if (answerObj.description !== "") {
          return (
            <div key={i} className="glossary-item">
              <div className="glossary-term">
                {answerObj.answer}
                <div className="glossary-line"></div>
              </div>
              <div className="glossary-definition">
                {answerObj.description}
              </div>
            </div>
          )
        }
      }
    )

    return (
      <div className="glossary-container">
        <h3 className="glossary-heading">Glossary</h3>
        {questionDescription}
        {answerDescriptions}
      </div>
    )
  },

  _renderPhaseOne: function () {
    let currentCatSelect = this.state.categorySelect
    let phaseOneQuestions = this.props.allQuestions
    let catQuestionTrackerEl = this.props.catQuestionTracker[currentCatSelect]
    let catCodeArray = catQuestionTrackerEl["codeArray"]
    let questionObjArray = phaseOneQuestions[currentCatSelect]
    let answeredQuestions = STORE.getStoreData().answeredQuestions
    let nextQuestion = _getNextCategoryQuestion(questionObjArray, catCodeArray, answeredQuestions)
    let questionText = nextQuestion["question"]
    let answersArray = nextQuestion["answers"]
    let answerEls = this._makeAnswersComponent(answersArray, nextQuestion)
    let glossary = <div className="bye"></div>
    if (questionText !== "")
      glossary = this._makeGlossary(nextQuestion)
    
    return (
      <div className="question-box col-md-8 col-md-offset-2">
        <h4 className="id-view-header">{questionText}</h4>
        <div className="question-card-container">
          {answerEls}
        </div>
        {glossary}
      </div>
    )
  },

  _renderCategoriesQuestion: function () {
    let questionStuff = this._makeQuestionComponents(this.props.categories)
    return (
      <div className="question-box col-md-8 col-md-offset-2">
        <h4 className="id-view-header">Choose part of plant to identify</h4>
        <div className="question-card-container">
          {questionStuff}
        </div>
      </div>
    )

  },

  _renderPhaseTwo: function () {
    let stateStuff = this.props.best.characteristic.states
    let charStuff = this._makePartTwoComponents(stateStuff)
    return (
      <div className="question-box col-md-8 col-md-offset-2">
        <h4>Choose best answer for {this.props.best.characteristic.characteristic}</h4>
        <div className="question-card-container">
          {charStuff}
        </div>
        <div className="question-card question-center" data-ch={this.props.best.characteristic.characteristic} data-cat={this.props.categorySelect} onClick={this._handleidontknow}>
          <p>I don't know/skip</p>
        </div>
      </div>
    )
  },

  _renderConfidence: function () {
    return (
      <div className="question-box col-md-8 col-md-offset-2">
        <h4>We believe your tree is below</h4>
      </div>
    )
  },

  render: function () {
    let answeredQuestions = this.props.answeredQuestions
    let categorySelected = STORE.getStoreData().categorySelect
    let numberOfansweredQuestions = answeredQuestions.length
    let currentQuestion = this.props.currentQuestion
    let filtersLength = STORE.getStoreData().filterChars.length
    let filteredTrees = STORE.getStoreData().filteredTrees

    if (categorySelected === '' || currentQuestion === 1) {
      return this._renderCategoriesQuestion()
    } else {
      if (filtersLength < 3 && currentQuestion < 3) {
        return this._renderPhaseOne()
      } else if ((filtersLength >= 3 || currentQuestion >= 3) && filteredTrees.length > 1) {
        return this._renderPhaseTwo()
      }
      else if (this.props.filteredTrees.length === 1) {
        return this._renderConfidence()
      } else {
        // ???? Something ain't right
        return (
          <div className='bye'></div>
        )
      }
    }
  }
})


export const QuestionItem = React.createClass({

  _handleQuesSelect: function (evt) {
    evt.preventDefault()
    let catClicked = evt.currentTarget.dataset.cat
    ID_ACTIONS.firstQuestionAction(evt.currentTarget.dataset.cat)
  },

  render: function () {
    let self = this
    if (this.props.questionData !== 'GENERAL') {
      return (
        <div className="question-card" data-cat={this.props.questionData} onClick={this._handleQuesSelect}>
          <p>{this.props.questionData}</p>
          <img src={CATEGORY_IMAGES[this.props.questionData]} />
        </div>
      )
    }
    else {
      return (
        <div className='bye'></div>
      )
    }
  }
})

export const PhaseOneQuestionItem = React.createClass({

  _handlePhaseOneSelect: function (evt) {
    let answerCode = evt.currentTarget.dataset.code
    let answerApply = evt.currentTarget.dataset.apply
    let questionText = evt.currentTarget.dataset.question
    let questionChar = evt.currentTarget.dataset.characteristic
    let answerCat = this.props.allProps.categorySelect
    ID_ACTIONS.answerPhaseOneAction(answerCat, answerCode, answerApply, questionText, questionChar)
  },

  render: function () {
    let catAnswers = this.props.questionData["answer"]
    let catCode = this.props.questionData["code"]
    let catApply = this.props.questionData["apply"]
    let catDescription = this.props.questionData["description"]
    let totalFilterList = this.props.filterChars
    let question = this.props.questionObjData.question
    let characteristicA = this.props.questionObjData.characteristic

    return (
      <div data-code={catCode} data-apply={catApply} data-question={question} data-characteristic={characteristicA} onClick={this._handlePhaseOneSelect} className="question-card hvr-grow">
        {catAnswers}
      </div>
    )
  }
})

export const PartTwoItem = React.createClass({

  _handleQuesSelect: function (evt) {
    evt.preventDefault()
    let filterChar = evt.currentTarget.dataset.id
    let catClicked = evt.currentTarget.dataset.cat
    let currentChar = evt.currentTarget.dataset.ch
    ID_ACTIONS.updateQuestionInfo(evt.currentTarget.dataset.cat, evt.currentTarget.dataset.id, evt.currentTarget.dataset.ch)
  },

  render: function () {
    if (this.props.results === 1) {
      return (
        <div className="question-card" data-ch={this.props.partTwoData.characteristic} data-cat={this.props.categorySelect} data-id={this.props.partTwoData.code} onClick={this._handleQuesSelect}>
          <p>{this.props.partTwoData.state}</p>
        </div>
      )
    }
    if (this.props.results > 1) {
      return (
        <div className="question-card" data-ch={this.props.partTwoData.characteristic} data-cat={this.props.categorySelect} data-id={this.props.partTwoData.code} onClick={this._handleQuesSelect}>
          <p>{this.props.partTwoData.state}</p>
        </div>
      )
    }
    if (this.props.results === 0) {
      return (
        <div className='bye'></div>
      )
    }
  }

})
