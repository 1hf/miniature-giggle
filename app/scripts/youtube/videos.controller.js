(function() {
	'use strict';

	angular
		.module('barebone.youtube')
		.controller('VideosController', VideosController);

	VideosController.$inject = ['$scope', '$state', '$ionicPopup', 'youtubeService'];

	/* @ngInject */
	function VideosController($scope, $state, $ionicPopup, youtubeService) {
		var youtubeData = {
			youtubeChannel: 'UCcALrkhwrCsQ8gb6HTnj6fQ',
			youtubeUsername: 'ESPN'
		}

		var vm = angular.extend(this, {
			videos: [],
			doRefresh: doRefresh,
			navigate: navigate
		});

		(function activate() {
			getVideos();
		})();
		// ********************************************************************

		function getVideos() {
			var youtubeSource = {
				channel: youtubeData.youtubeChannel,
				userName: youtubeData.youtubeUsername
			}
			return youtubeService.getVideos(youtubeSource)
				.then(function(videos) {
					vm.videos = videos;
				}, function() {
					$ionicPopup.alert({
						title: 'No videos',
						template: 'No videos to display fount'
					});
				});
		}

		function doRefresh() {
			getVideos().then(function(items) {
				$scope.$broadcast('scroll.refreshComplete');
			});
		}

		function navigate(video) {
			$state.go('app.video', {
				videoId: video.id
			});
		}
	}
})();