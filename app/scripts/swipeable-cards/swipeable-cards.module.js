(function() {
	'use strict';

	angular
		.module('barebone.swipeable-cards', [
			'ionic',
			'ionic.contrib.ui.cards'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.swipeable-cards', {
					url: '/swipeable-cards',
					views: {
						'menuContent': {
							templateUrl: 'scripts/swipeable-cards/swipeable-cards.html',
							controller: 'SwipeableCardsController as vm'
						}
					}
				});
		});
})();