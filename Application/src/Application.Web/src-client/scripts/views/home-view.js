import Backbone from 'backbone'
import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
import {TreeProfileComponent} from '../components/tree-profile-component.js'

export const HomeView = React.createClass({
  componentDidMount: function(){
    console.log(this.props.userProfile)
  },
    render: function () {
      return (
        <div className="hero">
          <img className="hero-img" src='../../images/david-straight-101789.jpg' />
          <div className="landing-container">             <h1 className ='home-head fade-in'>Magnolia TreeID</h1>
            <div className="landing-options">
              {/* <button className="button-nav"><i className="fa fa-search fa-2x" aria-hidden="true"></i><span className="btn-description">IDentify</span></button>
              <button className="button-nav"><i className="fa fa-book fa-2x" aria-hidden="true"></i><span className="btn-description">Browse all plants</span></button>
              <button className="button-login">Login</button>
              <button className="button-login">Register</button> */}
            </div>
          </div>
        </div>
      )
    }
  })
