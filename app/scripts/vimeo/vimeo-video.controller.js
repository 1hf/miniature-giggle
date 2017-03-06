(function() {
	'use strict';

	angular
		.module('barebone.vimeo')
		.controller('VimeoVideoController', VimeoVideoController);

	VimeoVideoController.$inject = ['$stateParams', 'vimeoService'];

	/* @ngInject */
	function VimeoVideoController($stateParams, vimeoService) {
		var videoId = $stateParams.videoId;

		var vm = angular.extend(this, {
			video: null
		});

		(function active() {
			getVideo();
		})();

		// ********************************************************************

		function getVideo() {
			vimeoService.getVideo(videoId)
				.then(function(video) {
					vm.video = video;
				});
		}
	}
})();