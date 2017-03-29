import React from 'react'
import {RegisterComponent} from '../components/register-component.js'

export const RegisterView = React.createClass({
	render: function(){
		return (
			<div className="container register-container">
				<h2>create an account</h2>
				<RegisterComponent/>
			</div>
		)
	}
})
