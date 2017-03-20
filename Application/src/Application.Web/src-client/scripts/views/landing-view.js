import Backbone from 'backbone'
import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'


export const LandingView = React.createClass({


      render: function(){
       //  console.log(this.props.filterChars)

         return (
<div className = "hero">

    <img className = "hero-img" src = 'http://i64.tinypic.com/2lthudd.jpg'/>

          <div className = "landing-container">             <h1>Magnolia TreeID</h1>
            <div className = "landing-options">
              <button className = "button-nav"><i className="fa fa-search" aria-hidden="true"></i>IDentify</button>
              <button className = "button-nav"><i className="fa fa-book" aria-hidden="true"></i>Browse all plants</button>
              <button className = "button-login">Login</button>
              <button className = "button-login">Register</button>
          </div>
        </div>
</div>
         )
      }
   })
