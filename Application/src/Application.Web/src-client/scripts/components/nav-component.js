import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
export const NavBar = React.createClass({
  _getMenuOptions: function(currentUserOnStore){
    console.log(currentUserOnStore.id)
		let routeList
		if( currentUserOnStore.id === 'undefined' || currentUserOnStore.id === null){
       routeList = [
          {appRouteName: 'HOME', displayText: 'home',  hashRoute: ''},
          {appRouteName: 'LANDING', displayText: 'landing-demo',  hashRoute: 'landing'},
          {appRouteName: 'REGISTER', displayText: 'register', hashRoute: 'register'},
          {appRouteName: 'LOGIN', displayText: 'login', hashRoute: 'login'},
          {appRouteName: 'BROWSE', displayText: 'browse', hashRoute: 'browse'}
        ]
      }else {
    			routeList = [
    				{appRouteName: 'HOME', displayText: 'Welcome', hashRoute:  '' },
              {appRouteName: 'LANDING', displayText: 'landing-demo',  hashRoute: 'landing'},
    	      {appRouteName: 'BROWSE', displayText: 'browse', hashRoute: 'browse'},
    				{appRouteName: 'LOGOUT', displayText: 'Log OUT!', hashRoute: 'logout' }
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
    console.log('currentNavRoute from <Navbar/>' , this.props.currentNavRoute)
console.log('currentUser per <Navbar/>' , this.props.currentUser)
    return(
      <nav>
        {this._showNavOptionsJSX(this.props.appRouteName, this.props.currentUser)}
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
    if(this.props.appRouteName === this.props.currentNavRoute){
      navOptionsClassName = 'nav-option nav-option-active'
  }
      return(
        <div
          onClick = {this._handleNavClick}
          className = {navOptionsClassName}
        >
          {this.props.displayText}
        </div>
)
    }
})
