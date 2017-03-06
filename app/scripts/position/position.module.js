(function() {
	'use strict';

	angular
		.module('barebone.position', [
			'ionic',
			'ngCordova'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.position', {
					url: '/position',
					views: {
						'menuContent': {
							templateUrl: 'scripts/position/position.html',
							controller: 'PositionController as vm'
						}
					}
				});
		});
})();