import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
export const NavBar = React.createClass({
  _getMenuOptions: function(currentUserOnStore){
		let routeList
		if( currentUserOnStore.id === 'undefined' || currentUserOnStore.id === null){
       routeList = [
          {appRouteName: 'HOME', displayText: <i className="fa fa-tree"><span className="label arrow_box">home</span></i>,  hashRoute: ''},
          {appRouteName: 'BROWSE', displayText: <i className="fa fa-binoculars"><span className="label arrow_box">browse</span></i>, hashRoute: 'browse'},
          {appRouteName: 'REGISTER', displayText: <i className="fa fa-user-plus"><span className="label arrow_box">register</span></i>, hashRoute: 'register'},
          {appRouteName: 'LOGIN', displayText: <i className="fa fa-sign-in"><span className="label arrow_box">login</span></i>, hashRoute: 'login'},
          {appRouteName: 'IDENTIFY', displayText: <i className = "fa fa-search"> <span className = "label arrow_box">IDentify</span></i>, hashRoute: 'identify' },
          {appRouteName: 'LANDING', displayText: 'landing-demo',  hashRoute: 'landing'},
        ]
      }else {
    			routeList = [
    				{appRouteName: 'HOME', displayText: 'Welcome', hashRoute:  '' },
              {appRouteName: 'LANDING', displayText: 'landing-demo',  hashRoute: 'landing'},
    	      {appRouteName: 'BROWSE', displayText:  <i className="fa fa-binoculars" aria-hidden="true"></i>, hashRoute: 'browse'},
    				{appRouteName: 'LOGOUT', displayText:<i className="fa fa-sign-out" aria-hidden="true"></i>, hashRoute: 'logout' }
    			]
    		}
    		return routeList
    	},
  _showNavOptionsJSX: function(currentNavRoute, currentUser){
    let theMenuRoutes = this._getMenuOptions(currentUser)


    let componentsList = theMenuRoutes.map(function(routeObj, i){
      return <RouteOption {...routeObj} key = {i} _currentNavRoute={currentNavRoute}/>
    })
    return componentsList
  },

  render: function(){
    return(
      <nav className = "navbar navbar-fixed-top navbar-styles navbar-right">
      <ul className ="navbar-right">
        {this._showNavOptionsJSX(this.props.appRouteName, this.props.currentUser)}
      </ul>
    </nav>
    )
  }
})


export const RouteOption = React.createClass({
  _handleNavClick: function(evt){
    ACTIONS.changeCurrentNav(this.props.appRouteName, this.props.hashRoute)
  },
  render: function(){
    let navOptionsClassName = "nav-option"
    if(this.props.hashRoute === window.location.hash.slice(1)){
      navOptionsClassName = 'nav-option nav-option-act'
  }
      return(
        <li
          onClick = {this._handleNavClick}
          className = {navOptionsClassName}
        >
          {this.props.displayText}
        </li>
)
    }
})
