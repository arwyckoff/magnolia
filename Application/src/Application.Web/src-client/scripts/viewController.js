import React from 'react';
import {NavBar} from './components/nav-component.js';
import {STORE} from './store.js'
import {ACTIONS} from './actions.js'
import {HomeView} from './views/home-view.js'
import {BrowseView} from './views/browse-view.js'

export const ViewController = React.createClass({

  getInitialState: function(){
    ACTIONS.changeCurrentNav(this.props.fromRoute, window.location.hash)
    let storeObject = STORE.getStoreData()
    return storeObject
  },

  componentWillMount: function(){
    let component = this
    STORE.onStoreChange(function(){
      let newStoreObj = STORE.getStoreData()
      component.setState(newStoreObj)
    })

  },

  render: function(){

    let componentToRender

    switch(this.state.currentNavRoute){
      case "HOME":
        componentToRender = <HomeView {...this.state}/>
        break;
    }

    return(
      <div>
        <NavBar {...this.state}/>
        {componentToRender}
      </div>
    )
  }
})
