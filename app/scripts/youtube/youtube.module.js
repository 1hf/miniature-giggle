(function() {
	'use strict';

	angular
		.module('barebone.youtube', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.videos', {
					url: '/videos',
					views: {
						'menuContent': {
							templateUrl: 'scripts/youtube/videos.html',
							controller: 'VideosController as vm'
						}
					}
				})
				.state('app.video', {
					url: '/videos/:videoId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/youtube/video.html',
							controller: 'VideoController as vm'
						}
					}
				});
		})
		.run(function($ionicPlatform, $rootScope) {
			$ionicPlatform.ready(function() {
				document.addEventListener("pause", function() {
					$rootScope.$broadcast('pauseVideo');
				});
			});
		});
})();
