import React from 'react'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'
export const TreeListComponent = React.createClass({
  _makeTreeComponents: function(treeList){
    console.log(treeList)
   let arrayOfTreeComponents = treeList.map(function(smod, i){
        return (
           <TreeItem treeData={smod} key={i}/>
        )
     })
   return arrayOfTreeComponents
 },

   render: function(){
      let self = this
      let allTheTrees = this.props.treeListData

      return (
        <div className = "trees">
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
    ACTIONS.changeCurrentNav ('PROFILE', `${id}/${latinName}`)
  },
   render: function(){
           return (
        <div className = "container-tree" onClick = {this._handleProfClick} data-route = {this.props.treeData.id} data-id = {this.props.treeData.latinName}>
          <h4>this tree</h4>
                   <p>{this.props.treeData.commonName}</p>
         </div>

      )
   }
})
