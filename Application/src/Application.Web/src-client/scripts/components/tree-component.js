import React from 'react'
import { TreeModel, TreeCollection } from '../models/tree-model.js'
import { STORE } from '../store.js'
import { ACTIONS } from '../actions.js'
import { BROWSE_ACTIONS } from '../browse_actions.js'



export const TreeListComponent = React.createClass({

  componentDidMount: function () {

    let self = this
    // console.log(this.props.treeListData)
  },


  _makeTreeComponents: function (treeList) {
    let arrayOfTreeComponents = treeList.map(
      (smod, i) => {
        return (
          <TreeItem treeData={smod} key={i} />
        )
      }
    )
    return arrayOfTreeComponents
  },

  render: function () {
    if (this.props.filterChars.length > 0 && this.props.filteredTrees.length === 0) {
      return (
        <div>
          <h2 className="noTrees">No Trees Match Your Criteria!</h2>
        </div>
      )
    }
    else {
      let filteredTreeJSX = this._makeTreeComponents(this.props.filteredTrees)
      return (
        <div className="filtered-trees-container">
          {filteredTreeJSX}
        </div>
      )
    }
  }
})

export const TreeItem = React.createClass({
  _handleProfClick: function (evt) {
    evt.preventDefault()
        ACTIONS.changeReadyState(false)
    let latinName = this.props.treeData.latinName
    let latinRoute = `tree/${latinName}`
    ACTIONS.changeCurrentNav('PROFILE', latinRoute)
  },
  render: function () {
    return (
      <div className="container-tree makeHand" onClick={this._handleProfClick}>
        <div>{this.props.treeData.commonName}</div>
        <div className="latin-name"><em>{this.props.treeData.latinName}</em></div>
      </div>
    )
  }
})
