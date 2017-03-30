import React from 'react'
import { ACTIONS } from '../actions.js'

export const FooterComponent = React.createClass({
  _handleLink: function (evt) {
    evt.preventDefault();
    ACTIONS.changeCurrentNav(evt.currentTarget.dataset.where.toUpperCase(), evt.currentTarget.dataset.where)
  },


  render: function () {
    return (
      <div className="mag-footer-container">
        <div className="footer-container">
          <div className="item contributors">
            <p>Contributors: Mary Hart, Alexandre Marcondes, and Andrew Wyckoff</p>
          </div>
          <div>
            <a className="item resources-link" data-where="resources" onClick={this._handleLink}>Resources</a>
          </div>
          <div>
            <a className=" item github-link" href="https://github.com/MagnoliaTreeID">View on GitHub</a>
          </div>
        </div>
      </div>
    )
  }
})
