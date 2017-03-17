import React from 'react'
import {RegisterComponent} from '../components/register-component.js'

import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'

export const RegisterView = React.createClass({

	componentDidMount: function(){

	  // STORE.onStoreChange(function(){
	  //   component.setState( STORE.getStoreData() )
	  // })



	},
	render: function(){

		return (

			<div className="container">
					<RegisterComponent/>

			</div>
		)
	}
})
