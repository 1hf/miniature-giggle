(function() {
	'use strict';

	angular
		.module('barebone.oauth')
		.factory('oauthTwitterService', oauthTwitterService);

	oauthTwitterService.$inject = ['$cordovaOauth', 'ENV', '$q', '$twitterApi', '$http'];

	/* @ngInject */
	function oauthTwitterService($cordovaOauth, ENV, $q, $twitterApi, $http) {
		var service = {
			login: login,
			logout: logout,
			getProfile: getProfile
		};
		return service;

		function configure(authToken) {
			var appKey = ENV.twitterApiKey;
			var appSecret = ENV.twitterApiSecret;
			$twitterApi.configure(appKey, appSecret, authToken);
		}

		function logout() {
			$http.defaults.headers.common.Authorization = undefined;
		}

		function login() {
			var appKey = ENV.twitterApiKey;
			var appSecret = ENV.twitterApiSecret;

			return $cordovaOauth.twitter(appKey, appSecret).then(function(result) {
				console.log('Response Object -> ' + JSON.stringify(result));
				return result;
			}, function(error) {
				console.log('Error -> ' + error);
			});
		}
		
		function getProfile(authToken) {
			configure(authToken);

			return $twitterApi.getUserDetails(authToken['user_id']).then(function(result) {
				console.log('RESPONSE => ' + JSON.stringify(result));
				var name = result.name.split(' ');
				return {
					firstName: name[0],
					lastName: name[1]
				};
			}, function(error) {
					console.log(error);
			});
		}
	}
})();
