import React from 'react'
import { STORE } from '../store.js'
import { ACTIONS } from '../actions.js'

export const LandingComponent = React.createClass({
  render: function () {
    return (
      <div className="landing-container">
        <h1 className="landing-title">M<span className="smallcaps">AGNOLIA</span> T<span className="smallcaps">REE</span> ID</h1>
        <div className="landing-line"></div>
        <div className="landing-subtitle">A polychotomous tree identification engine</div>
      </div>
    )
  }
})
