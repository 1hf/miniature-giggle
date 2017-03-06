(function() {
	'use strict';

	angular
		.module('barebone.products-extended', [
			'ionic',
			'barebone.shopping-cart'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.products-extended', {
					url: '/products-extended',
					views: {
						'menuContent': {
							templateUrl: 'scripts/products-extended/products-extended.html',
							controller: 'ProductsExtendedController as vm'
						}
					}
				})
				.state('app.product-extended', {
					url: '/products-extended/:productId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/products-extended/product-extended.html',
							controller: 'ProductExtendedController as vm'
						}
					}
				});

		});

})();