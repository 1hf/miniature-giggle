(function () {
	'use strict';

	angular
		.module('barebone.swipeable-cards')
		.controller('SwipeableCardsController', SwipeableCardsController);

	SwipeableCardsController.$inject = ['swipeableCardsService'];

	/* @ngInject */
	function SwipeableCardsController(swipeableCardsService) {
		var cards;
		var vm = angular.extend(this, {
			items: [],
			cardSwiped: cardSwiped,
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
			swipeableCardsService.getItems().then(function (items) {
				cards = items;
				addCard();
			});
		}

		function cardSwiped(index) {
			addCard();
		}

		function cardDestroyed(index) {
			vm.items.splice(index, 1);
		}

		function addCard() {
			if (cards.length === 0) {
				return;
			}
			var newCard = cards[0]; 
			cards.splice(0, 1);
			vm.items.push(newCard);
		}
	}
})();