import React from 'react'
import {LogoutComponent} from '../components/logout-component.js'

export const LogoutView = React.createClass({
  render: function(){
    return(
      <div className = "container">
        <LogoutComponent/>
      </div>
    )
  }
})
