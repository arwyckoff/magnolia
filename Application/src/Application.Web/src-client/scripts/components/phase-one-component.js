import React from 'react';
import {STORE} from '../store.js';
import {ACTIONS} from '../actions.js';
import {BROWSE_ACTIONS} from '../browse_actions.js'
import {ID_ACTIONS} from '../id-actions.js'


export const PhaseOneComponent = React.createClass({

  getInitialState: function(){
  return STORE.getStoreData()
},

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
          <h2 className="noTrees">No Trees Match Your Criteria!</h2>
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
    let latinName = this.props.treeData.latinName
    let latinRoute = `tree/${latinName}`
    ACTIONS.changeCurrentNav ('PROFILE', latinRoute)
  },
   render: function(){


      return (

        <div className = "container-tree" onClick = {this._handleProfClick}>
                   <p className= "single-tree makeHand">{this.props.treeData.commonName}</p>

       </div>
      )
   }
})
