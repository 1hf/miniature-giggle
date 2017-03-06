(function() {
	'use strict';

	angular
		.module('barebone.products-extended')
		.factory('productsExtendedService', productsExtendedService);

	productsExtendedService.$inject = ['$q', '$http', '_'];

	/* @ngInject */
	function productsExtendedService($q, $http, _) {
		var url = 'http://skounis.s3.amazonaws.com/mobile-apps/barebone-ionic/products.json';
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
					result = data.result;
					deferred.resolve(result);
				})
				.error(function(data, status, headers, config) {
					console.log('ERROR (Products):' + status);
					deferred.reject(result);
				});

			return deferred.promise;
		}

		function get(productId) {
			// we take a product from cache but we can request ir from the server
			for (var i = 0; i < result.length; i++) {
				if (result[i].id === productId) {
					return $q.when(result[i]);
				}
			}
			return $q.when(null);
		}
	}
})();
