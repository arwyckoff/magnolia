import React from 'react'
import $ from 'jquery'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'

export const IdComponent = React.createClass({
  initialize: function(){
    return STORE.getStoreData()
  },

  handleNextQuestion: function(){
    let componenet = this
    let characteristicObjectList = this.props.codeList
      for (var singleCharObject in this.props.codeList){
        if (singleCharObject.length === 2 && singleCharObject.slice(0,1) === 'A'){
          STORE.setStore('filterChars', singleCharObject)}
          }
  },

  render: function(){
    return(
      <div className = "question-box">
        <h4>hello!</h4>
        <ul>

        </ul>
      </div>
    )
  }

})
