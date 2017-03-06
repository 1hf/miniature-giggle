(function() {
	'use strict';

	angular
		.module('barebone.instagram', [
			'ionic',
			'ngCordova',
			'angularMoment',
			'LocalStorageModule'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.instagram-login', {
					url: '/instagram-login',
					views: {
						'menuContent': {
							templateUrl: 'scripts/instagram/login/instagram-login.html',
							controller: 'InstagramLoginController as vm'
						}
					}
				})
				.state('app.instagram-recent-media', {
					url: '/instagram-recent-media',
					views: {
						'menuContent': {
							templateUrl: 'scripts/instagram/recent-media/instagram-recent-media.html',
							controller: 'InstagramRecentMediaController as vm'
						}
					}
				});
		});
})();