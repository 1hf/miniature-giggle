(function() {
	'use strict';

	angular
		.module('barebone.oauth')
		.factory('oauthFacebookService', oauthFacebookService);

	oauthFacebookService.$inject = ['$cordovaOauth', '$http', 'ENV'];

	/* @ngInject */
	function oauthFacebookService($cordovaOauth, $http, ENV) {
		var apiUrl = 'https://graph.facebook.com/v2.3/';

		var scope = ['email'];
		var service = {
			login: login,
			getProfile: getProfile
		};
		return service;

		function login() {
			var appId = ENV.facebookAppId;
			return $cordovaOauth.facebook(appId, scope).then(function(result) {
				console.log('Success');
				console.log(result);

				return result['access_token'];
			}, function(error) {
				console.log('Error');
				console.log(error);
			});
		}
		
		function getProfile(authToken) {
			var params = getParams(authToken);
			params.fields = 'id,name,email';

			return $http.get(apiUrl + 'me', params).then(function(result) {
				return {
					firstName: result.data['first_name'],
					lastName: result.data['last_name'],
					email: result.data['email']
				};
			}, function(error) {
				console.log(error);
			});
		}
		
		function getParams(accessToken) {
			return {
				params: {
					'access_token': accessToken,
					'format': 'json'
				}
			};
		}
	}
})();
