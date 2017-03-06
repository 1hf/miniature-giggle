(function() {
	'use strict';

	angular
		.module('barebone.restaurant-catalogue')
		.controller('RestaurantCatalogueController', RestaurantCatalogueController);

	RestaurantCatalogueController.$inject = ['$scope', '$state', 'restaurantCartService', 'restaurantCatalogueService'];

	/* @ngInject */
	function RestaurantCatalogueController($scope, $state, restaurantCartService, restaurantCatalogueService) {
		var vm = angular.extend(this, {
			items: [],
			showItemDetails: showItemDetails,
			showMyCart: showMyCart
		});

		(function activate() {
			loadCatalogue();
		})();

		// ******************************************************

		function loadCatalogue() {
			restaurantCatalogueService.all().then(function(data) {
				vm.items = data;
			});
		}

		function showMyCart() {
			restaurantCartService.showMyCart();
		}

		function showItemDetails(itemId) {
			$state.go('app.restaurant-catalogue-item', {
				itemId: itemId
			});
		}
	}
})();