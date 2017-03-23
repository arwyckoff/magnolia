import React from 'react'
import {TreeModel, TreeCollection} from '../models/tree-model.js'
import {STORE} from '../store.js'
import {ACTIONS} from '../actions.js'
import {BROWSE_ACTIONS} from '../browse_actions.js'



export const TreeListComponent = React.createClass({

  componentDidMount: function (){

    let self = this
    // console.log(this.props.treeListData)
  },


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
      //  console.log(this.props.filterChars)
      //  console.log(this.props.treeListData)

      // let self = this
      // let allTheTrees = this.props.filteredTrees

    if(this.props.filterChars.length > 0 && this.props.filteredTrees.length === 0){
      return (

        <div>
          <h2>No Trees Match Your Criteria!</h2>
        </div>

      )
    }
    else {
      let filteredTreeJSX =  this._makeTreeComponents(this.props.filteredTrees)
      return (

        <div className="col-8">
               {filteredTreeJSX}
        </div>
      )
    }
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


      return (

        <div className = "container-tree">
                   <p className= "single-tree">{this.props.treeData.commonName}</p>

       </div>
      )
   }
})
