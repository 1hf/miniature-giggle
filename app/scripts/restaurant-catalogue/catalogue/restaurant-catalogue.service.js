(function() {
	'use strict';

	angular
		.module('barebone.restaurant-catalogue')
		.factory('restaurantCatalogueService', restaurantCatalogueService);

	restaurantCatalogueService.$inject = ['$q', '$http', '_'];

	/* @ngInject */
	function restaurantCatalogueService($q, $http, _) {
		var url = 'http://skounis.s3.amazonaws.com/mobile-apps/barebone-ionic/items.json';
		var result = [];

		var service = {
			all: all,
			get: get
		};
		return service;

		// ******************************************************************

		function all() {
			return $http.get(url)
				.then(function(response) {
					result = response.data.result;
					return result;
				}, function(response) {
					console.log('ERROR (Catalogue): ' + response.status);
					return $q.reject(response);
				});
		}

		function get(itemId) {
			for (var i = 0; i < result.length; i++) {
				if (result[i].id === itemId) {
					return $q.when(result[i]);
				}
			}
			return $q.when(null);
		}
	}
})();
