(function() {
	'use strict';

	angular
		.module('barebone.facebook')
		.controller('FacebookLoginController', FacebookLoginController);

	FacebookLoginController.$inject = ['$state', 'facebookAuthService', 'facebookService', 'ENV'];

	/* @ngInject */
	function FacebookLoginController($state, facebookAuthService, facebookService, ENV) {
		var vm = angular.extend(this, {
			login: login,
			logout: logout,
			showAlbums: showAlbums,
			showPagePhotos: showPagePhotos,
			accessToken: null,
			profile: null
		});

		(function activate() {
			getAccessToken();
			if (vm.accessToken) {
				getProfile();
			}
		})();
		// ********************************************************************

		function login() {
			facebookAuthService.login()
				.then(function(accessToken) {
					vm.accessToken = accessToken;
				})
				.then(getProfile);
		}

		function logout() {
			facebookAuthService.logout();
			vm.accessToken = null;
			vm.profile = null;
		}

		function getProfile() {
			facebookService.getMyProfile().then(function(profile) {
				vm.profile = profile;
			});
		}

		function getAccessToken() {
			vm.accessToken = facebookAuthService.getAccessToken();
		}

		function showAlbums() {
			$state.go('app.facebook-albums', {
				pageId: 'me'
			});
		}

		function showPagePhotos() {
			$state.go('app.facebook-albums', {
				pageId: ENV.facebookPage
			});
		}
	}
})();