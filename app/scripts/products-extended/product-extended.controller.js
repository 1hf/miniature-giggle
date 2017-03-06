(function() {
	'use strict';

	angular
		.module('barebone.products-extended')
		.controller('ProductExtendedController', ProductExtendedController);

	ProductExtendedController.$inject = ['$scope', '$stateParams', 'productsExtendedService', 'shoppingCartService'];

	/* @ngInject */
	function ProductExtendedController($scope, $stateParams, productsExtendedService, shoppingCartService) {
		var vm = angular.extend(this, {
			product: null,
			addToCart: addToCart,
			showMyCart: showMyCart
		});


		(function activate() {
			loadProduct();
		})();
		// **********************************************

		function showMyCart() {
			shoppingCartService.showMyCart();
		}

		function loadProduct() {
			var productId = parseInt($stateParams.productId);

			productsExtendedService.get(productId)
				.then(function(product) {
					vm.product = product;
				});
		}

		function addToCart() {
			shoppingCartService.addToCart({
				name: vm.product.title,
				price: vm.product.price,
				currency: vm.product.currency,
				picture: vm.product.pictures[0],
				description: vm.product.body
			});
		}
	}
})();