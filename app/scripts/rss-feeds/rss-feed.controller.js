(function() {
	'use strict';

	angular
		.module('barebone.rss-feeds')
		.controller('RSSFeedController', RSSFeedController);

	RSSFeedController.$inject = ['$stateParams', 'rssFeedsService'];

	/* @ngInject */
	function RSSFeedController($stateParams, rssFeedsService) {
		var vm = angular.extend(this, {
			entries: null,
			rssFeedId: parseInt($stateParams.rssFeedId, 10)
		});

		// ********************************************************************

		function loadFeed() {
			rssFeedsService.getFeed(vm.rssFeedId)
				.then(function(entries) {
					vm.entries = entries;
				});
		}
		loadFeed();
	}
})();
