import Backbone from 'backbone'
import $ from 'jquery'

export const UserModel = Backbone.Model.extend({
	initialize: function(){

	},
	urlRoot: '/api/authentication',

})

UserModel.logIn =  function(email, password){
	if(typeof email !== 'string' || typeof password !== 'string'  ){ throw new Error(`UserModel.login() must receive string 2 string paramaters for username and password`) }

	return $.ajax({
		method: 'POST',
		data: JSON.stringify({ email: email, password: password}),
		headers: {
			'Content-Type': 'application/json'
		},
		url: '/api/accounts/login'
	})
}

UserModel.register =  function(dataObj){
	if(typeof dataObj !== 'object' ){ throw new Error(`UserModel.register() must receive an object`) }
	if(typeof dataObj.email === 'undefined' || typeof dataObj.password === 'undefined'  ){ throw new Error(`UserModel.register() must receive an object w/ username + password`) }

	return $.ajax({
		method: 'POST',
		data: JSON.stringify(dataObj),
		headers: {
			'Content-Type': 'application/json'
		},
		url: '/api/accounts/register'
	})
}

UserModel.getCurrentUser =  function(){
	return $.ajax({
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		url: '/api/authentication'
	})
}


UserModel.logOut =  function(){
	// console.log('logging in!')
	return $.ajax({
		method: 'PUT',
		url: '/api/accounts/logout'
	})
}
