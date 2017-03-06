(function() {
	'use strict';

	angular
		.module('barebone.oauth')
		.factory('oauthService', oauthService);

	oauthService.$inject = ['$injector', 'ENV', 'localStorageService', '$q'];

	/* @ngInject */
	function oauthService($injector, ENV, localStorageService, $q) {
		var oauthTokenKey = 'oauthToken';

		var service = {
			login: login,
			logout: logout,
			isAuthorized: isAuthorized,
			getProfile: getProfile,
			getOAuthProvider: getOAuthProvider
		};
		return service;

		function login(source) {
			return getOAuthService(source).login().then(function(accessToken) {
				if (!accessToken) {
					return $q.reject();
				}

				var oauthToken = {
					accessToken: accessToken,
					source: source
				};
				setOAuthToken(oauthToken);
				return oauthToken;
			});
		}

		function logout() {
			var oauthService = getOAuthService();
			if (oauthService.logout) {
				oauthService.logout();
			}
			setOAuthToken(null);
		}

		function getProfile() {
			if (!isAuthorized()) {
				alert('You are not authorized');
				return $q.reject();
			}

			var oauthService = getOAuthService();
			return oauthService.getProfile(getOAuthToken().accessToken);
		}

		function isAuthorized() {
			return !!getOAuthToken();
		}

		function getOAuthProvider() {
			return getOAuthToken().source;
		}

		function getOAuthService(source) {
			source = source || getOAuthToken().source;
			switch(source) {
				case 'facebook':
					return $injector.get('oauthFacebookService');
				case 'twitter':
					return $injector.get('oauthTwitterService');
				case 'google':
					return $injector.get('oauthGoogleService');
			}
			throw new Error('Source \'' + source + '\' is not valid');
		}

		function setOAuthToken(token) {
			localStorageService.set(oauthTokenKey, token);
		}

		function getOAuthToken() {
			return localStorageService.get(oauthTokenKey);
		}
	}
})();
