(function() {
	'use strict';

	angular
		.module('barebone.restaurant-cart', [
			'ionic',
			'LocalStorageModule'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.restaurant-cart', {
					url: '/restaurant-cart',
					views: {
						'menuContent': {
							templateUrl: 'scripts/restaurant-catalogue/cart/restaurant-cart/restaurant-cart.html',
							controller: 'RestaurantCartController as vm'
						}
					}
				});
		});
})();