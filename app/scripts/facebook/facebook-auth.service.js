(function() {
	'use strict';

	angular
		.module('barebone.facebook')
		.factory('facebookAuthService', facebookAuthService);

	facebookAuthService.$inject = ['$cordovaOauth', '$http', '$q', 'ENV', 'localStorageService'];

	/* @ngInject */
	function facebookAuthService($cordovaOauth, $http, $q, ENV, localStorageService) {
		var scope = ['email', 'user_photos'];

		var service = {
			login: login,
			logout: logout,
			isAuthorized: isAuthorized,
			getAccessToken: getAccessToken,
			getPermanentAccessToken: getPermanentAccessToken
		};
		return service;

		// ***********************************************************

		function logout() {
			localStorageService.remove('facebookAccessToken');
		}

		function login() {
			return $cordovaOauth.facebook(ENV.facebookAppId, scope).then(function(result) {
				console.log('Success');
				console.log(result);

				var accessToken = result['access_token'];
				localStorageService.set('facebookAccessToken', accessToken);

				return accessToken;
			}, function(error) {
				console.log('Error');
				console.log(error);
			});
		}

		function getAccessToken() {
			return localStorageService.get('facebookAccessToken');
		}

		function getPermanentAccessToken() {
			return ENV.facebookPermanentAccessToken;
		}

		function isAuthorized() {
			return !!getAccessToken();
		}
	}
})();