(function () {
	'use strict';

	angular
		.module('barebone.oauth', [
			'ionic',
			'ngTwitter'
		])
		.config(function ($stateProvider) {
			$stateProvider
				.state('app.oauth-login', {
					url: '/oauth-login',
					views: {
						'menuContent': {
							templateUrl: 'scripts/oauth/login/oauth.html',
							controller: 'OAuthController as vm'
						}
					}
				})
				.state('app.oauth-profile', {
					url: '/oauth-profile',
					views: {
						'menuContent': {
							templateUrl: 'scripts/oauth/profile/oauth-profile.html',
							controller: 'OAuthProfileController as vm'
						}
					},
					authenticate: true
				});
		})
		.run(function ($rootScope, $state, oauthService) {
			// Redirect to login if route requires oauthService and you're not logged in
			$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
				if (toState.authenticate && !oauthService.isAuthorized()) {
					event.preventDefault();
					$rootScope.returnToState = toState.name;
					$state.go('app.oauth-login');
				}
			});
		});;
})();