(function() {
	'use strict';

	angular
		.module('barebone.charts', [
			'ionic',
			'googlechart'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.charts', {
					url: '/charts',
					views: {
						'menuContent': {
							templateUrl: 'scripts/charts/charts.html',
							controller: 'ChartsController as vm'
						}
					}
				});
		});
})();