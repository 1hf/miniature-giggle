(function() {
	'use strict';

	angular
		.module('barebone.stream', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.stream', {
					url: '/stream',
					views: {
						'menuContent': {
							templateUrl: 'scripts/stream/stream.html',
							controller: 'StreamController as vm'
						}
					}
				});
		});
})();
