(function() {
	'use strict';

	angular
		.module('barebone.sqlite', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.sqlite', {
					url: '/sqlite',
					views: {
						'menuContent': {
							templateUrl: 'scripts/sqlite/sqlite.html',
							controller: 'SQLiteController as vm'
						}
					}
				});
		});
})();