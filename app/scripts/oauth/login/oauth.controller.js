(function() {
	'use strict';

	angular
		.module('barebone.oauth')
		.controller('OAuthController', OAuthController);

	OAuthController.$inject = ['oauthService', '$rootScope', '$state', '$ionicHistory'];

	/* @ngInject */
	function OAuthController(oauthService, $rootScope, $state, $ionicHistory) {
		var vm = angular.extend(this, {
			facebookLogin: facebookLogin,
			googleLogin: googleLogin,
			twitterLogin: twitterLogin
		});

		(function activate() {
		})();

		// ********************************************************************

		function facebookLogin() {
			login('facebook');
		}
		
		function googleLogin() {
			login('google');
		}

		function twitterLogin() {
			login('twitter');
		}
		
		function login(source) {
			oauthService.login(source).then(function(result) {
				debugger;
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$state.go($rootScope.returnToState || 'app.oauth-profile');
			});
		}
	}
})();