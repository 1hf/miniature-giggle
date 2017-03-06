(function() {
	'use strict';

	angular
		.module('barebone.restaurant-catalogue', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.restaurant-catalogue', {
					url: '/restaurant-catalogue',
					views: {
						'menuContent': {
							templateUrl: 'scripts/restaurant-catalogue/catalogue/restaurant-catalogue.html',
							controller: 'RestaurantCatalogueController as vm'
						}
					}
				})
				.state('app.restaurant-catalogue-item', {
					url: '/restaurant-catalogue/:itemId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/restaurant-catalogue/catalogue/restaurant-catalogue-item.html',
							controller: 'RestaurantCatalogueItemController as vm'
						}
					}
				});

		});

})();