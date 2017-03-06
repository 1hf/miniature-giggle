(function() {
	'use strict';

	angular
		.module('barebone.galleries')
		.factory('galleriesService', galleriesService);

	galleriesService.$inject = ['$http', '$q'];

	/* @ngInject */
	function galleriesService($http, $q) {
		var url = 'http://skounis.s3.amazonaws.com/mobile-apps/barebone-glossy/galleries.json';
		var result = [];

		var service = {
			all: all,
			get: get
		};
		return service;

		// ******************************************************************

		function all() {
			var deferred = $q.defer();

			$http.get(url)
				.success(function(data, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available
					result = data.result;
					deferred.resolve(result);
				})
				.error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					console.log('ERROR (Galleries):' + status);
					deferred.reject();
				});

			return deferred.promise;
		}

		function get(galleryId) {
			for (var i = 0; i < result.length; i++) {
				if (result[i].id === galleryId) {
					return $q.when(result[i]);
				}
			}
			return $q.when(null);
		}
	}
})();