(function() {
	'use strict';

	angular
		.module('barebone.shopping-cart', [
			'ionic',
			'LocalStorageModule'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.shopping-cart', {
					url: '/shopping-cart',
					views: {
						'menuContent': {
							templateUrl: 'scripts/shopping-cart/my-cart/my-cart.html',
							controller: 'MyCartController as vm'
						}
					}
				});
		});
})();