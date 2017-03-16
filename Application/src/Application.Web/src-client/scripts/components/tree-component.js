import React from 'react'


export const TreeListComponent = React.createClass({

  _makeTreeComponents: function(treeList){
   let arrayOfTreeComponents = treeList.map(function(smod, i){
        return (
           <TreeItem treeData={smod} key={i}/>
        )
     }).reverse()

   return arrayOfTreeComponents
 },

   render: function(){
      let self = this
      let allTheTrees = this.props.treeListData

      return (
        <div>
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
                   <p>{this.props.treeData}</p>
         </div>

      )
   }
})
