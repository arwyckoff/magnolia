import React from 'react'
import { STORE } from '../store.js'
import { ACTIONS } from '../actions.js'

export const LandingComponent = React.createClass({
  _handleLink: function (evt) {
    evt.preventDefault();
    ACTIONS.changeCurrentNav(evt.currentTarget.dataset.where.toUpperCase(), evt.currentTarget.dataset.where)
  },

  render: function () {
    return (
      <div className="landing-container">
        <h1 className="landing-title">M<span className="smallcaps">AGNOLIA</span> T<span className="smallcaps">REE</span> ID</h1>
        <div className="landing-line"></div>
        <div className="landing-subtitle">A polychotomous tree identification engine</div>
        <div className="landing-call-to-action">
          <div className="landing-identify-action landing-pill">
            <a className="landing-link" data-where="identify" onClick={this._handleLink} >Start identifying</a>
            <p>trees based on their characteristics</p>
          </div>
          <div className="landing-or-action">
            <em>— or —</em>
          </div>
          <div className="landing-browse-action landing-pill">
            <a  className="landing-link" data-where="browse" onClick={this._handleLink}>Browse our database</a>
            <p>of trees native to the Southeastern United States</p>
          </div>
        </div>
      </div>
    )
  }
})
