(function() {
	'use strict';

	angular
		.module('barebone.instagram')
		.factory('instagramService', instagramService);

	instagramService.$inject = ['$cordovaOauth', '$q', '$http', 'localStorageService', 'ENV'];

	/* @ngInject */
	function instagramService($cordovaOauth, $q, $http, localStorageService, ENV) {
		var scope = ['basic'];
		var recentMediaUrl = 'https://api.instagram.com/v1/users/self/media/recent';

		var service = {
			login: login,
			logout: logout,
			isAuthorized: isAuthorized,
			getRecentMedia: getRecentMedia,
			getAccessToken: getAccessToken
		};
		return service;

		// ***********************************************************

		function isAuthorized() {
			return !!localStorageService.get('instagramAccessToken');
		}

		function login() {
			return $cordovaOauth.instagram(ENV.instagramAppId, scope).then(function(result) {
				console.log('Success');
				console.log(result);

				localStorageService.set('instagramAccessToken', result['access_token']);

				// return result['access_token'];
				return result;

			}, function(error) {
				console.log('Error');
				console.log(error);

				return error;
			});
		}

		function logout() {
			localStorageService.remove('instagramAccessToken');
		}

		function getRecentMedia() {
			var url = buildUrl(recentMediaUrl);
			return $http.get(url).then(function(result) {
				return result.data.data;
			});
		}

		function getAccessToken(){
			return localStorageService.get('instagramAccessToken');
		}

		function buildUrl(url) {
			var accessToken = localStorageService.get('instagramAccessToken');
			accessToken = accessToken;
			return url + '?access_token=' + accessToken;
		}
	}
})();
