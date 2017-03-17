import React from 'react'
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
export const NavBar = React.createClass({
  _getMenuOptions: function(currentUserOnStore){
    let routeList
    if(typeof currentUserOnStore.id ==='undefined'){
       routeList = [
        {appRouteName: 'HOME', displayText: 'home',  hashRoute: ''},
        {appRouteName: 'PROFILE', displayText: 'profile', hashRoute: ':id/:latinName'},
        {appRouteName: 'REGISTER', displayText: 'register', hashRoute: 'register'},
        {appRouteName: 'LOGIN', displayText: 'login', hashRoute: 'login'}
      ]
    }
      else {
        routeList = [
          {appRouteName: 'HOME', displayText: 'Chirp',  hashRoute: ''},
          {appRouteName: 'LOGOUT', displayText: 'logout',  hashRoute: 'logout'}
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
      <nav>
        {this._showNavOptionsJSX(this.props.currentNavRoute, this.props.currentUser)}
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
    if(this.props.appRouteName === this.props._currentNavRoute){
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
