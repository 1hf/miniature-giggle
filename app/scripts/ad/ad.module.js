(function() {
	'use strict';

	angular
		.module('barebone.ad', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.ad', {
					url: '/ad',
					cache: false,
					views: {
						'menuContent': {
							templateUrl: 'scripts/ad/ad.html',
							controller: 'AdController as vm'
						}
					}
				});
		});
})();