import React from 'react'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {STORE} from '../store.js'
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
   render: function(){
      return (
        <div className = "container-tree">
          <h4>this tree</h4>
                   <p>{this.props.treeData.commonName}</p>
         </div>

      )
   }
})
