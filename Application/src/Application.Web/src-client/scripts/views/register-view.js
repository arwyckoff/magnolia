import React from 'react'
import {RegisterComponent} from '../components/register-component.js'

export const RegisterView = React.createClass({
	render: function(){
		return (
			<div className="container-login">
				<RegisterComponent/>
			</div>
		)
	}
})
