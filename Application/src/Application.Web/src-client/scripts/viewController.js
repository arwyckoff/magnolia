import React from 'react';
import {NavBar} from './components/nav-component.js';
import {STORE} from './store.js'
import {ACTIONS} from './actions.js'
import {HomeView} from './views/home-view.js'
import {ProfileView} from './views/profile-view.js'
import {RegisterView} from './views/register-view.js'
import {LoginView} from './views/login-view.js'
import {LogoutView} from './views/logout-view.js'
import {BrowseView} from './views/browse-view.js'
import {LandingView} from './views/landing-view.js'
import {IdentifyView} from './views/id-view.js'

export const ViewController = React.createClass({

  getInitialState: function(){
    ACTIONS.fetchAllTrees()
    ACTIONS.fetchAllCharCodes()
    ACTIONS.fetchAllCategories()
    ACTIONS.fetchAllCharCodes()
    ACTIONS.changeCurrentNav(this.props.fromRoute, window.location.hash)
    let storeObject = STORE.getStoreData()
    return storeObject
  },

  componentWillMount: function(){
    let component = this;
    STORE.onStoreChange(function(){
      let newStoreObj = STORE.getStoreData()
      component.setState(newStoreObj)
    })
    ACTIONS.fetchCurrentUser()
    // ACTIONS.fetchAllTrees()

  },

  render: function(){
		let componentToRender

    switch(this.state.currentNavRoute){
      case "HOME":
        componentToRender = <HomeView {...this.state}/>
        break;
      case "PROFILE":
        componentToRender = <ProfileView {...this.state}/>
        break;
      case "REGISTER":
        componentToRender = <RegisterView {...this.state}/>
        break;
      case "LOGIN":
        componentToRender = <LoginView {...this.state}/>
        break;
      case "LOGOUT":
        componentToRender = <LogoutView {...this.state}/>
        break;
        case "IDENTIFY":
          componentToRender = <IdentifyView {...this.state}/>
          break;
      case "BROWSE":
        componentToRender = <BrowseView {...this.state}/>
        break;
        default:
    }
    return(
      <div>
        <NavBar {...this.state}/>
        {componentToRender}
      </div>
    )
  }
})
