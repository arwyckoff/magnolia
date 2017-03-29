import React from 'react'
import { ACTIONS } from '../actions.js'
import { STORE } from '../store.js'
import { PreloaderComponent } from '../components/preloader-component.js'

export const NavBar = React.createClass({
  getInitialState: function () {
    return STORE.getStoreData()
  },

  _getMenuOptions: function (currentUserOnStore) {
    let routeList
    if (currentUserOnStore.id === 'undefined' || currentUserOnStore.id === null) {
      routeList = [
        { appRouteName: 'HOME', displayText: <i className="fa fa-tree fa-2x"><span className="label arrow_box">home</span></i>, hashRoute: '' },
        { appRouteName: 'IDENTIFY', displayText: <i className="fa-2x fa fa-leaf"><span className="label arrow_box">identify</span></i>, hashRoute: 'identify' },
        { appRouteName: 'BROWSE', displayText: <i className="fa-2x fa fa-binoculars"><span className="label arrow_box">browse</span></i>, hashRoute: 'browse' },
        { appRouteName: 'LOGIN', displayText: <i className="fa-2x fa fa-sign-in"><span className="label arrow_box">login</span></i>, hashRoute: 'login' },
        { appRouteName: 'REGISTER', displayText: <i className="fa-2x fa fa-user-plus"><span className="label arrow_box">register</span></i>, hashRoute: 'register' },

      ]
    } else {
      routeList = [
        { appRouteName: 'HOME', displayText: <i className="fa fa-2x fa-tree"><span className="label arrow_box">home</span></i>, hashRoute: '' },
        { appRouteName: 'IDENTIFY', displayText: <i className="fa-2x fa fa-search"><span className="label arrow_box">identify</span></i>, hashRoute: 'identify' },
        { appRouteName: 'BROWSE', displayText: <i className="fa-2x fa fa-binoculars" aria-hidden="true"><span className="label arrow_box">browse</span></i>, hashRoute: 'browse' },
        { appRouteName: 'MYPROFILE', displayText: <i className="fa-2x fa fa-user-o" aria-hidden="true"><span className="label arrow_box">my profile</span></i>, hashRoute: 'my-profile' },
        { appRouteName: 'LOGOUT', displayText: <i className="fa-2x fa fa-sign-out" aria-hidden="true"><span className="label arrow_box">logout</span></i>, hashRoute: 'logout' }
      ]
    }
    return routeList
  },

  _showNavOptionsJSX: function (currentNavRoute, currentUser) {
    let theMenuRoutes = this._getMenuOptions(currentUser)

    let componentsList = theMenuRoutes.map(
      (routeObj, i) => {
        return <RouteOption {...routeObj} key={i} _currentNavRoute={currentNavRoute} />
      }
    )

    return componentsList
  },

  componentWillMount: function () {
    if (this.props.currentNavRoute === 'PROFILE') {
      ACTIONS.changeReadyState(false)
    } else {
      ACTIONS.changeReadyState(true)
    }
  },

  render: function () {
    let currentNavRouteFirst = this.props.currentNavRoute[0]
    let currentNavRouteRest = this.props.currentNavRoute.slice(1)
    if (this.props.ready === false) {
      return (
        <PreloaderComponent />
      )
    } else {
      return (
        <nav className="mag-nav navbar-fixed-top navbar-styles">
          <div className="navbar-text navRoute">M<span className="smallcaps">AGNOLIA</span> T<span className="smallcaps">REE</span> ID</div>
          <div className="navbar-text navRoute navbar-current">{currentNavRouteFirst}<span className="smallcaps">{currentNavRouteRest}</span></div>
          <ul className="route-options">
            {this._showNavOptionsJSX(this.props.appRouteName, this.props.currentUser)}
          </ul>
        </nav>
      )
    }
  }
})


export const RouteOption = React.createClass({
  _handleNavClick: function (evt) {
    ACTIONS.changeCurrentNav(this.props.appRouteName, this.props.hashRoute)
  },
  render: function () {
    let navOptionsClassName = "nav-option hvr-grow"
    if (this.props.hashRoute === window.location.hash.slice(1)) {
      navOptionsClassName = 'nav-option nav-option-act hvr-grow'
    }
    return (
      <li
        onClick={this._handleNavClick}
        className={navOptionsClassName}
      >
        {this.props.displayText}
      </li>
    )
  }
})
