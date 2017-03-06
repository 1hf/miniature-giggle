(function() {
	'use strict';

	angular
		.module('barebone.tinder-cards')
		.factory('tinderCardsService', tinderCardsService);

	tinderCardsService.$inject = ['$q'];

	/* @ngInject */
	function tinderCardsService($q) {

		var items = [{
			title: 'Ayaan',
			image: 'images/cards/face-1.jpg'
		}, {
			title: 'Giulio',
			image: 'images/cards/face-2.jpg'
		}, {
			title: 'Sara',
			image: 'images/cards/face-3.jpg'
		}, {
			title: 'Michael',
			image: 'images/cards/face-4.jpg'
		}, {
			title: 'Erica',
			image: 'images/cards/face-5.jpg'
		}, {
			title: 'Elsa',
			image: 'images/cards/face-6.jpg'
		}, {
			title: 'Francisco',
			image: 'images/cards/face-7.jpg'
		}];

		var service = {
			getItems: getItems
		};
		return service;

		function getItems() {
			return $q.when(angular.copy(items));
		}
	}
})();
