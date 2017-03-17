import React from 'react'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {STORE} from '../store.js'

export const TreeListComponent = React.createClass({

  _makeTreeComponents: function(treeList){
    // console.log(treeList)
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


      // console.log(this.props.treeListData)
      // let statesArray = []
      // let treeDataChars = this.props.treeListData.characteristics
      //
      // for (var i = 0, len = treeDataChars.length; i < len; i++) {
      //       statesArray.push(treeDataChars[i].state)
      //   console.log(statesArray);
      // }
      //


      return (
        <div className = "trees container-browse">
               {this._makeTreeComponents(allTheTrees)}
        </div>
      )
   }
})

export const TreeItem = React.createClass({
   render: function(){

     let statesArray = []
     let treeDataCommonNames = this.props.treeData.commonName

     if(statesArray.indexOf(this.props.filterChars) === -1){
       statesArray.push(treeDataCommonNames)
       console.log(statesArray)
     }
      return (

        <div className = "container-tree">
                   <p className= "single-tree">{this.props.treeData.commonName}</p>
                    {/* <p className= "single-tree prop">{statesArray}</p> */}
         </div>


      )
   }
})
