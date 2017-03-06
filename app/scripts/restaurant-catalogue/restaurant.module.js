(function() {
	'use strict';

	angular
		.module('barebone.restaurant', [
			'barebone.restaurant-catalogue',
			'barebone.restaurant-cart',
			'barebone.restaurant-delivery'
		]);
})();