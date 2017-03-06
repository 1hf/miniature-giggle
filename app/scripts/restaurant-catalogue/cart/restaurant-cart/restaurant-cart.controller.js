(function() {
	'use strict';

	angular
		.module('barebone.restaurant-cart')
		.controller('RestaurantCartController', RestaurantCartController);

	RestaurantCartController.$inject = ['$ionicListDelegate', '_', 'restaurantCartService', '$state'];

	/* @ngInject */
	function RestaurantCartController($ionicListDelegate, _, restaurantCartService, $state) {
		var vm = angular.extend(this, {
			items: [],
			proceedToPayment: proceedToPayment,
			changeQuantity: changeQuantity,
			deleteItem: deleteItem,
			total: 0,
			currency: null
		});

		(function activate() {
			loadItems();
		})();

		// ********************************************************************

		function loadItems() {
			vm.items = restaurantCartService.getAll();
			calculateTotalAmount();
		}

		function proceedToPayment() {
			$state.go('app.delivery-method-selector');
		}

		function flushCart() {
			restaurantCartService.flush();
			vm.items = [];
			calculateTotalAmount();
		}

		function calculateTotalAmount() {
			vm.currency = null;
			vm.total = 0;
			_.each(vm.items, function(item) {
				vm.total += item.price * item.quantity;
				vm.currency = item.currency;
			});
		}

		function changeQuantity(item) {
			restaurantCartService.changeQuantity(item)
				.then(loadItems);
			$ionicListDelegate.closeOptionButtons();
		}

		function deleteItem(item) {
			restaurantCartService.deleteItem(item);
			loadItems();
		}
	}
})();
