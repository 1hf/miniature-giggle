(function() {
	'use strict';

	angular
		.module('barebone.restaurant-catalogue')
		.controller('RestaurantCatalogueItemController', RestaurantCatalogueItemController);

	RestaurantCatalogueItemController.$inject = [
		'$scope', '$stateParams', 'restaurantCatalogueService', 'restaurantCartService'];

	/* @ngInject */
	function RestaurantCatalogueItemController($scope, $stateParams, restaurantCatalogueService, restaurantCartService) {
		var vm = angular.extend(this, {
			item: null,
			addToCart: addToCart,
			showMyCart: showMyCart
		});


		(function activate() {
			loadItem();
		})();

		// **********************************************

		function showMyCart() {
			restaurantCartService.showMyCart();
		}

		function loadItem() {
			var itemId = parseInt($stateParams.itemId);

			restaurantCatalogueService.get(itemId)
				.then(function(item) {
					vm.item = item;
				});
		}

		function addToCart() {
			restaurantCartService.addToCart({
				name: vm.item.title,
				price: vm.item.price,
				currency: vm.item.currency,
				picture: vm.item.pictures[0],
				description: vm.item.body
			});
		}
	}
})();