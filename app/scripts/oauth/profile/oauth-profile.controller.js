(function() {
	'use strict';

	angular
		.module('barebone.oauth')
		.controller('OAuthProfileController', OAuthProfileController);

	OAuthProfileController.$inject = ['oauthService', '$state', '$ionicHistory'];

	/* @ngInject */
	function OAuthProfileController(oauthService, $state, $ionicHistory) {
		var vm = angular.extend(this, {
			data: null,
			oauthProvider: oauthService.getOAuthProvider(),
			logout: logout
		});

		(function activate() {
			getProfile();
		})();

		// ********************************************************************

		function getProfile() {
			oauthService.getProfile().then(function(data) {
				vm.data = data;
			});
		}
		
		function logout() {
			oauthService.logout();
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go('app.oauth-login');
		}
	}
})();