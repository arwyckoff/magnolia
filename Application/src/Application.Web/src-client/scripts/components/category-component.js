import React from 'react'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {CodeModel, CodeCollection} from '../models/code-model.js'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'
import {BROWSE_ACTIONS} from '../browse_actions.js'
import {CATEGORIES} from '../utils/categories.js'



export const CategoryComponent = React.createClass({
  // getInitialState: function(){
  //     Category: ""
  //   }
  componentDidMount: function (){
    // console.log(CATEGORIES)


  },

  _handleCatSelect: function(evt){

    let catClicked = evt.currentTarget.dataset.cat


    ACTIONS.changeCategory(catClicked)



},

render: function (){

  let {categories} = this.props
  let keyNamesJsx = Object.keys(categories).map( (keyName,i) => {
    return(
      <div onClick={this._handleCatSelect} key={i} data-cat={keyName}><a>{keyName.toLowerCase()}</a></div>
     )
  })

  // console.log('???categories', keyNamesJsx )
  return (

    <div>
        <h4>Categories</h4>
        {keyNamesJsx}


    </div>


    )
  }
})

//this.props[selectedCat].map()
