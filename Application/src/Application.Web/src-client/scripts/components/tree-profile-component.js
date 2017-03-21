import React from 'react'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'
export const TreeProfileComponent = React.createClass({
  _makeTreeComponents: function(treeList){
   let arrayOfTreeComponents = treeList.map(function(smod, i){
        return (
           <TreeItem treeData={smod} key={i}/>
        )
     })
   return arrayOfTreeComponents
 },

   render: function(){
    //  console.log(this.props.filterChars)
      let self = this
      let allTheTrees = this.props.treeListData
      return (
        <div className = "trees container-browse">
               {this._makeTreeComponents(allTheTrees)}
        </div>
      )
   }
})

export const TreeItem = React.createClass({
  _handleProfClick: function(evt){
    evt.preventDefault()
    let latinName = this.props.treeData.latinName
    let latinRoute = `tree/${latinName}`
    ACTIONS.changeCurrentNav ('PROFILE', latinRoute)
  },
   render: function(){
    //  let statesArray = []
    //  let treeDataCommonNames = this.props.treeData.commonName
     //
    //  if(statesArray.indexOf(this.props.filterChars) === -1){
    //    statesArray.push(treeDataCommonNames)
    //    console.log(statesArray)
    //  }
      return (

        <div className = "container-tree">
                   <p className= "single-tree">{this.props.treeData.commonName}</p>
                    {/* <p className= "single-tree prop">{statesArray}</p> */}
        <div className = "container-tree" onClick = {this._handleProfClick} data-route = {this.props.treeData.id} data-id = {this.props.treeData.latinName}>
          <h4>this tree</h4>
                   <p>{this.props.treeData.commonName}</p>
         </div></div>
      )
   }
})
