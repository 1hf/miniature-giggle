(function() {
	'use strict';

	angular
		.module('barebone.rss-feeds')
		.controller('RSSFeedsController', RSSFeedsController);

	RSSFeedsController.$inject = ['$scope', '$state', 'rssFeedsService'];

	/* @ngInject */
	function RSSFeedsController($scope, $state, rssFeedsService) {
		var vm = angular.extend(this, {
			rssFeeds: []
		});

		// ********************************************************************

		rssFeedsService.getFeedList()
			.then(function(data) {
				vm.rssFeeds = data;
			});
	}
})();
