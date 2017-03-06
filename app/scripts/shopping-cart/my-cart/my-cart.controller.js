(function() {
	'use strict';

	angular
		.module('barebone.shopping-cart')
		.controller('MyCartController', MyCartController);

	MyCartController.$inject = ['$ionicListDelegate', '_', 'shoppingCartService', 'orderProcessor'];

	/* @ngInject */
	function MyCartController($ionicListDelegate, _, shoppingCartService, orderProcessor) {
		var vm = angular.extend(this, {
			items: [],
			checkout: checkout,
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
			vm.items = shoppingCartService.getAll();
			calculateTotalAmount();
		}

		function checkout() {
			orderProcessor.processOrder(vm.items).then(flushCart, function(message) {
				alert('An error was occurred, please check the configuration of the email client. \n\n' + message);
			});
		}

		function flushCart() {
			shoppingCartService.flush();
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
			shoppingCartService.changeQuantity(item)
				.then(loadItems);
			$ionicListDelegate.closeOptionButtons();
		}

		function deleteItem(item) {
			shoppingCartService.deleteItem(item);
			loadItems();
		}
	}
})();
