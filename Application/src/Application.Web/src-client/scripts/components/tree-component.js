import React from 'react'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'
import {BROWSE_ACTIONS} from '../browse_actions.js'

export const TreeListComponent = React.createClass({
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
       console.log(this.props.filterChars)
      //  console.log(this.props.treeListData)

      let self = this
      let allTheTrees = this.props.filteredTrees
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
    let profileEl = evt.currentTarget
    let id = this.props.treeData.id
    let latinName = this.props.treeData.latinName
    ACTIONS.changeCurrentNav ('PROFILE', latinName)
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
                {/* <h1>ehlllloo</h1> */}
                    {/* <p className= "single-tree prop">{statesArray}</p> */}
        {/* <div className = "container-tree" onClick = {this._handleProfClick} data-route = {this.props.treeData.id} data-id = {this.props.treeData.latinName}>
   */}
                   {/* <p>{this.props.treeData.commonName}</p> */}
         {/* </div> */}
       </div>
      )
   }
})
