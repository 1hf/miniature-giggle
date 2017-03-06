(function() {
	'use strict';

	angular
		.module('barebone.shopping-cart')
		.factory('shoppingCartService', shoppingCartService);

	shoppingCartService.$inject = ['$rootScope', '$ionicPopup', '$state', '_', 'localStorageService'];

	/* @ngInject */
	function shoppingCartService($rootScope, $ionicPopup, $state, _, localStorageService) {
		var cart = localStorageService.get('shopping-cart') || [];

		var service = {
			addToCart: addToCart,
			showMyCart: showMyCart,
			deleteItem: deleteItem,
			changeQuantity: changeQuantity,
			flush: flush,
			getAll: getAll
		};
		return service;

		// ********************************************************

		function deleteItem(itemToRemove) {
			_.remove(cart, function(item) {
				return item === itemToRemove;
			});
			localStorageService.set('shopping-cart', cart);
		}

		function flush() {
			cart = [];
			localStorageService.set('shopping-cart', cart);
		}

		function showMyCart() {
			$state.go('app.shopping-cart');
		}

		function getAll() {
			return cart;
		}

		function addToCart(cartItem) {
			var popup = createAddToCartPopup(cartItem.name);

			return $ionicPopup.show(popup).then(function(result) {
				if (result.canceled) {
					return;
				}

				cartItem.quantity = result.quantity;
				cart.push(cartItem);

				localStorageService.set('shopping-cart', cart);
			});
		}

		function changeQuantity(cartItem) {
			var popup = createAddToCartPopup(cartItem.name, cartItem.quantity);

			return $ionicPopup.show(popup).then(function(result) {
				if (result.canceled) {
					return;
				}

				cartItem.quantity = result.quantity;
				localStorageService.set('shopping-cart', cart);
			});
		}

		function createAddToCartPopup(title, quantity) {
			var scope = $rootScope.$new();
			scope.data = {
				quantity: quantity || 1
			};

			return {
				templateUrl: 'scripts/shopping-cart/add-to-cart.html',
				title: title,
				subTitle: 'Quantity:',
				scope: scope,
				buttons: [{
					text: 'Cancel',
					onTap: function(e) {
						scope.data.canceled = true;
						return scope.data;
					}
				}, {
					text: '<b>Add to cart</b>',
					type: 'button-positive',
					onTap: function(e) {
						var quantity = parseInt(scope.data.quantity);
						if (quantity > 0) {
							scope.data.quantity = quantity;
							return scope.data;
						} else {
							alert('Quantity should be greather then zero');
							e.preventDefault();
						}
					}
				}]
			};
		}
	}
})();