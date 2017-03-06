(function() {
	'use strict';

	angular
		.module('barebone.youtube')
		.factory('youtubeService', youtubeService);

	youtubeService.$inject = ['$http', '$q', '_', 'ENV'];

	/* @ngInject */
	function youtubeService($http, $q, _, ENV) {
		var key = ENV.youtubeKey;

		var apiUrl = 'https://www.googleapis.com/youtube/v3/';
		var videosUrl = apiUrl + 'playlistItems?part=snippet&key=' + key + '&maxResults=' + 20;
		var playlistsUrl = apiUrl + 'channels?part=contentDetails&key=' + key;

		var videos = [];
		var service = {
			getVideos: getVideos,
			getVideo: getVideo
		};
		return service;

		////////////////

		function getVideo(videoId) {
			if (videos.length) {
				return $q.when(_.find(videos, 'id', videoId));
			} else {
				return getVideos().then(function() {
					return _.find(videos, 'id', videoId);
				});
			}
		}

		function getVideos(youtubeSource) {
			return getPlaylistId(youtubeSource).then(function(playlistId) {
				if (!playlistId) {
					return $q.reject();
				}
				var url = videosUrl + '&playlistId=' + playlistId;

				return $http.get(url)
					.then(function(response) {
						videos = [];
						_.each(response.data.items, function(item) {
							var snippet = item.snippet;
							var thumbs = snippet.thumbnails;

							var maxThumb = thumbs.maxres || thumbs.high || thumbs.medium || thumbs.default;

							videos.push({
								id: item.id,
								title: snippet.title,
								description: snippet.description,
								date: snippet.publishedAt,
								image: maxThumb.url,
								thumb: thumbs.default.url,
								videoId: snippet.resourceId.videoId
							});
						});
						return videos;
					});
			});

		}

		function getPlaylistId(youtubeSource) {
			var url
			if (youtubeSource.channel) {
				url = playlistsUrl + '&id=' + youtubeSource.channel;
			} else {
				url = playlistsUrl + '&forUsername=' + youtubeSource.userName;
			}
			return $http.get(url).then(function(response) {
				var items = response.data.items;
				if (items.length && items[0].contentDetails.relatedPlaylists.uploads) {
					return items[0].contentDetails.relatedPlaylists.uploads;
				}

				return null;
			});
		}
	}
})();
