(function() {
	'use strict';

	angular
		.module('barebone.youtube')
		.controller('VideoController', VideoController);

	VideoController.$inject = ['$scope', '$stateParams', 'youtubeService', '$filter'];

	/* @ngInject */
	function VideoController($scope, $stateParams, youtubeService, $filter) {
		var videoId = $stateParams.videoId;

		var vm = angular.extend(this, {
			video: null
		});

		(function active() {
			getVideo();
		})();

		// ********************************************************************

		function getVideo() {
			youtubeService.getVideo(videoId)
				.then(function(video) {
					vm.video = video;
				});
		}

		$scope.$on('pauseVideo', function() {
			document.querySelector('iframe').src = $filter('youtubeEmbedUrl')(vm.video.videoId).toString();
		});

	}
})();
