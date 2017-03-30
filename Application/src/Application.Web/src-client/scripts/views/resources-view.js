import Backbone from 'backbone'
import React from 'react'
import { ACTIONS } from '../actions.js'
import { STORE } from '../store.js'
import { ResourcesComponent } from '../components/resources-component.js'

export const ResourcesView = React.createClass({
  render: function () {
    return (
      <div>
        <ResourcesComponent />
      </div>
    )
  }
})
