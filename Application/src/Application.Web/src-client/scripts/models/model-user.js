import Backbone from 'backbone'
import $ from 'jquery'

export const UserModel = Backbone.Model.extend({
	initialize: function(){

	},
	urlRoot: '/api/accounts',
	idAttribute: '_id'
})

UserModel.logIn =  function(username, password){
	if(typeof username !== 'string' || typeof password !== 'string'  ){ throw new Error(`UserModel.login() must receive string 2 string paramaters for username and password`) }

	return $.ajax({
		method: 'POST',
		data: JSON.stringify({ username: username, password: password}),
		headers: {
			'Content-Type': 'application/json'
		},
		url: '/api/accounts/login'
	})
}

UserModel.register =  function(dataObj){
	if(typeof dataObj !== 'object' ){ throw new Error(`UserModel.register() must receive an object`) }
	if(typeof dataObj.username === 'undefined' || typeof dataObj.password === 'undefined'  ){ throw new Error(`UserModel.register() must receive an object w/ username + password`) }

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
		method: 'GET',
		url: '/api/accounts/logout'
	})
}
