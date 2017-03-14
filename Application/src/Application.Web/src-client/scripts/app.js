import Backbone from 'backbone';
import ReactDOM from 'react-dom'
import React from 'react'

const SomeComponent = React.createClass({
	render: function(){
		return (
			<div>
				<h1> I Really &#10084; u<br/> Baybee Shampoo</h1>
				<p><small>
					you make my hair so soft and i know you will never make me cry.
				</small></p>
			</div>
		)
	}
})

ReactDOM.render(<SomeComponent/>, document.querySelector('#app-container'))
