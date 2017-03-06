(function() {
	'use strict';

	angular
		.module('barebone.products-extended')
		.controller('ProductsExtendedController', ProductsExtendedController);

	ProductsExtendedController.$inject = ['$scope', '$state', 'shoppingCartService', 'productsExtendedService'];

	/* @ngInject */
	function ProductsExtendedController($scope, $state, shoppingCartService, productsExtendedService) {
		var vm = angular.extend(this, {
			products: [],
			showProductDetails: showProductDetails,
			showMyCart: showMyCart
		});

		(function activate() {
			loadProducts();
		})();

		// ******************************************************

		function loadProducts() {
			productsExtendedService.all().then(function(data) {
				vm.products = data;
			});
		}

		function showMyCart() {
			shoppingCartService.showMyCart();
		}

		function showProductDetails(productId) {
			$state.go('app.product-extended', {
				productId: productId
			});
		}
	}
})();