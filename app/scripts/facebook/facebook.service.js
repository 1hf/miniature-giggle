(function() {
	'use strict';

	angular
		.module('barebone.facebook')
		.factory('facebookService', facebookService);

	facebookService.$inject = ['$http', '$q', '_', 'facebookAuthService'];

	/* @ngInject */
	function facebookService($http, $q, _, facebookAuthService) {
		var apiUrl = 'https://graph.facebook.com/v2.3/';

		var scope = ['email', 'user_photos', 'manage_pages'];

		var service = {
			getAlbums: getAlbums,
			getMyProfile: getMyProfile,
			getAlbumPhotos: getAlbumPhotos
		};
		return service;

		// ***********************************************************

		function getAccessToken(pageId) {
			return pageId === 'me' ?
				facebookAuthService.getAccessToken() :
				facebookAuthService.getPermanentAccessToken();
		}

		function getParams(pageId) {
			return {
				params: {
					'access_token': getAccessToken(pageId),
					format: 'json'
				}
			};
		}

		function getAlbumPhotos(pageId, albumId, url) {
			url = url || apiUrl + albumId + '/photos';
			return $http.get(url, getParams(pageId)).then(function(result) {
				return result.data;
			});
		}

		function getAlbums(pageId) {
			var params = getParams(pageId);

			return $http.get(apiUrl + pageId + '/albums', params).then(function(result) {
				_.each(result.data.data, function(album) {
					album.cover = apiUrl + album['cover_photo'];
					album.cover = album.cover + '/picture?access_token=' + getAccessToken(pageId);
				});

				return result.data;
			});
		}

		function getMyProfile() {
			if(facebookAuthService.isAuthorized()) {
				var params = getParams('me');
				params.fields = 'id,name,gender,email,location,website,picture,relationship_status';

				return $http.get(apiUrl + 'me', params).then(function(result) {
					return result.data;
				}, function(error) {
					alert('There was a problem getting your profile.  Check the logs for details.');
					console.log(error);
				});
			} else {
				alert('You are not authorized');
				return $q.reject();
			}
		}
	}
})();
