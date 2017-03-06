(function() {
	'use strict';

	angular
		.module('barebone.vimeo', [
			'ionic',
			'config'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.vimeo-videos', {
					url: '/vimeo-videos',
					views: {
						'menuContent': {
							templateUrl: 'scripts/vimeo/vimeo-videos.html',
							controller: 'VimeoVideosController as vm'
						}
					}
				})
				.state('app.vimeo-video', {
					url: '/vimeo-videos/:videoId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/vimeo/vimeo-video.html',
							controller: 'VimeoVideoController as vm'
						}
					}
				});
		});
})();