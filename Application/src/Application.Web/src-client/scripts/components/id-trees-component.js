import React from 'react'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'
import {ID_ACTIONS} from '../id-actions.js'


export const TreeIDComponent = React.createClass({

  componentWillMount: function (){
    let allTheTrees = STORE.getStoreData().treeListData
    let currentQuestion = STORE.getStoreData().currentQuestion
    if (currentQuestion ===1){
      STORE.setStore('filteredTrees', allTheTrees)
      STORE.setStore('filterChars', [])}
      return STORE.getStoreData()
  },


  _makeTreeComponents: function(treeList){
   let arrayOfTreeComponents = treeList.map(function(smod, i){
        return (
           <TreeIDItem treeData={smod} key={i}/>
        )
     })
   return arrayOfTreeComponents
 },
_handleBrowse: function(){
      ACTIONS.changeCurrentNav ('BROWSE', 'browse')
},
_handleReset: function(){
  ID_ACTIONS.resetIDProps()
},
   render: function(){

     if (this.props.filteredTrees.length/this.props.treeListData.length > .5){
       return (<div className = "bye"></div>)
     }
    if(this.props.filterChars.length > 0 && this.props.filteredTrees.length === 0){
      return (

        <div>
          <h2>No trees match your criteria. Please <a className="landing-link" onClick={this._handleReset}>try again</a> or explore all in <a className="landing-link" onClick={this._handleBrowse}>browse view</a></h2>
        </div>

      )
    }
    else if (this.props.filteredTrees.length===1){
      let filteredTreeJSX =  this._makeTreeComponents(this.props.filteredTrees)
      return (

        <div className="all-trees">
               {filteredTreeJSX}
        </div>
      )
    }
    else {
      let filteredTreeJSX =  this._makeTreeComponents(this.props.filteredTrees)
      return (

        <div className="all-trees">
          <h4 className="possible-matches"> Possible matches </h4>
               {filteredTreeJSX}
        </div>
      )
    }
   }
})

export const TreeIDItem = React.createClass({
  _handleProfClick: function(evt){
    evt.preventDefault()
    ACTIONS.changeReadyState(false)
    let latinName = this.props.treeData.latinName
    let latinRoute = `tree/${latinName}`
    ACTIONS.changeCurrentNav ('PROFILE', latinRoute)
  },
   render: function(){


      return (

        <div className = "tree-one" onClick = {this._handleProfClick}>
         <p className= "one-tree make-hand back-pink">{this.props.treeData.commonName}</p>

       </div>
      )
   }
})
