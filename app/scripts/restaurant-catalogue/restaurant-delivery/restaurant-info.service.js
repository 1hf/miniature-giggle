(function() {
	'use strict';

	angular
		.module('barebone.restaurant-delivery')
		.factory('restaurantInfoService', restaurantInfoService);

	restaurantInfoService.$inject = [];

	/* @ngInject */
	function restaurantInfoService() {
		var data = {
			location: {
				origin: {
					lat : 37.407,
					lon : -122.1
				},
				zoomLevel: 15
			},
			restaurant: {
				name: 'My restaurant',
				address: '10777 Santa Monica BoulevardLos Angeles, California 90025-4718, United States of America',
				email: 'foo@bar.com'
			}
		};
		var service = {
			location: data.location,
			restaurant: data.restaurant
		};
		return service;
	}
})();
