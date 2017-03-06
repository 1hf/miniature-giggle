(function() {
	'use strict';

	angular
		.module('barebone.lo-storage', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.lo-storage', {
					url: '/lo-storage',
					views: {
						'menuContent': {
							templateUrl: 'scripts/lo-storage/lo-storage.html',
							controller: 'LoStorageController as vm'
						}
					}
				});
		});
})();