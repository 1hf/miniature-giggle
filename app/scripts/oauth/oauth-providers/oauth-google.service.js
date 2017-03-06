(function() {
	'use strict';

	angular
		.module('barebone.oauth')
		.factory('oauthGoogleService', oauthGoogleService);

	oauthGoogleService.$inject = ['$cordovaOauth', '$http', 'ENV', '$q'];

	/* @ngInject */
	function oauthGoogleService($cordovaOauth, $http, ENV, $q) {
		var apiUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';
		var scope = ['email'];

		var service = {
			login: login,
			getProfile: getProfile
		};
		return service;

		function login() {
			var appId = ENV.googleAppId;

			return $cordovaOauth.google(appId, scope).then(function(result) {
				console.log('Response Object -> ' + JSON.stringify(result));
				return result['access_token'];
			}, function(error) {
				console.log('Error -> ' + error);
			});
		}
		
		function getProfile(authToken) {
			var params = getParams(authToken);

			return $http.get(apiUrl, params).then(function(result) {
				var name = result.data['name'].split(' ');
				return {
					firstName: name[0],
					lastName: name[1],
					email: result.data['email']
				};
			}, function(error) {
				console.log(error);
			});
		}
		
		function getParams(accessToken) {
			return {
				params: {
					'access_token': accessToken
				}
			};
		}
	}
})();
