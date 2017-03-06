(function() {
	'use strict';

	angular
		.module('barebone.vimeo')
		.factory('vimeoService', vimeoService);

	vimeoService.$inject = ['$http', '$q', '_', 'ENV'];

	/* @ngInject */
	function vimeoService($http, $q, _, ENV) {
		var apiUrl = 'https://api.vimeo.com/users/';
		var currentPage = 1;
		var itemsPerPage = 20;

		var videos = [];

		var service = {
			getVideos: getVideos,
			getMoreVideos: getMoreVideos,
			getVideo: getVideo
		};
		return service;

		// ****************************************************************

		function getVideo(videoId) {
			if (videos.length) {
				return $q.when(_.find(videos, 'id', videoId));
			} else {
				return getVideos().then(function() {
					return _.find(videos, 'id', videoId);
				});
			}
		}

		function getMoreVideos(userId) {
			return getVideos(userId, currentPage + 1);
		}

		function getVideos(userId, page) {
			currentPage = page || 1;

			var url = apiUrl + userId + '/videos';
			url += '?page=' + currentPage + '&per_page=' + itemsPerPage;

			return $http.get(url)
				.then(function(response) {
					if (currentPage === 1) {
						videos = [];
					}

					_.each(response.data.data, function(item) {
						var id = item.uri.substring(8);

						var image = item.pictures.sizes[0].link;

						videos.push({
							id: id,
							title: item.name,
							description: item.description,
							date: item['created_time'],
							image: image,
							thumb: image,
							videoId: id
						});
					});

					return {
						videos: videos,
						moreItemsAvailable: videos.length < response.data.total
					};
				});
		}
	}
})();
