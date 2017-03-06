(function() {
	'use strict';

	angular
		.module('barebone.tinder-cards', [
			'ionic',
			'ionic.contrib.ui.tinderCards'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.tinder-cards', {
					url: '/tinder-cards',
					views: {
						'menuContent': {
							templateUrl: 'scripts/tinder-cards/tinder-cards.html',
							controller: 'TinderCardsController as vm'
						}
					}
				});
		});
})();