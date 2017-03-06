(function() {
	'use strict';

	angular
		.module('barebone.rss-feeds')
		.filter('rssDate', rssDate);

	function rssDate() {
		return function(value) {
			return new Date(value).toLocaleString();
		};
	}
})();