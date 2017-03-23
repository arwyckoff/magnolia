import React from 'react'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'
import {BROWSE_ACTIONS} from '../browse_actions.js'


export const IdComponent = React.createClass({

  componentDidMount: function (){

  },

  _handleCatSelect: function(evt){
    let catClicked = evt.currentTarget.dataset.cat

    ACTIONS.changeCategory(catClicked)
},

render: function (){

  let {categories} = this.props
  console.log(this.props)
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

    <div className = "question-box">
        <h4>Choose part of plant to identify</h4>
        {keyNamesJsx}

    </div>
  )
}
})

export const QuestionComponent
