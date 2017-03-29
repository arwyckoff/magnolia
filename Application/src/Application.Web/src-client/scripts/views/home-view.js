import Backbone from 'backbone'
import React from 'react'
import { ACTIONS } from '../actions.js'
import { STORE } from '../store.js'
import { LandingComponent } from '../components/landing-component.js'

export const HomeView = React.createClass({
  render: function () {
    return (
      <div>
        <LandingComponent />
      </div>  
    )
  }
})
