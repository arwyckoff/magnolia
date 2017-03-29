import React from 'react'
import { STORE } from '../store.js'
import { ACTIONS } from '../actions.js'

export const LandingComponent = React.createClass({
  render: function () {
    return (
      <div className="landing-container">
        <h1>M<span className="smallcaps">AGNOLIA</span> T<span className="smallcaps">REE</span> ID</h1>
      </div>
    )
  }
})
