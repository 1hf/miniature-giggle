(function() {
	'use strict';

	angular
		.module('barebone.facebook', [
			'ionic',
			'ngCordova'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.facebook-login', {
					url: '/facebook-login',
					views: {
						'menuContent': {
							templateUrl: 'scripts/facebook/login/facebook-login.html',
							controller: 'FacebookLoginController as vm'
						}
					}
				})
				.state('app.facebook-albums', {
					url: '/facebook-albums/:pageId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/facebook/albums/facebook-albums.html',
							controller: 'FacebookAlbumsController as vm'
						}
					}
				})
				.state('app.facebook-album', {
					url: '/facebook-album/:pageId/:albumId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/facebook/album/facebook-album.html',
							controller: 'FacebookAlbumController as vm'
						}
					}
				});
		});
})();