(function () {
	'use strict';

	angular
		.module('barebone.tinder-cards')
		.controller('TinderCardsController', TinderCardsController);

	TinderCardsController.$inject = ['tinderCardsService'];

	/* @ngInject */
	function TinderCardsController(tinderCardsService) {
		var vm = angular.extend(this, {
			items: [],
			cardDestroyed: cardDestroyed,
			refresh: refresh
		});

		(function activate() {
			getItems();
		})();

		// ********************************************************************

		function refresh() {
			cardDestroyed(0);
			getItems();
		}

		function getItems() {
			tinderCardsService.getItems().then(function (items) {
				vm.items = items;
			});
		}

		function cardDestroyed(index) {
			vm.items.splice(index, 1);
		}
	}
})();