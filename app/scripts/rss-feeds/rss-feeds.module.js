(function() {
	'use strict';

	angular
		.module('barebone.rss-feeds', [
			'ionic',
			'base64'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.rssfeeds', {
					url: '/rssfeeds',
					views: {
						'menuContent': {
							templateUrl: 'scripts/rss-feeds/rss-feeds.html',
							controller: 'RSSFeedsController as vm'
						}
					}
				})
				.state('app.rssfeed', {
					url: '/rssfeeds/:rssFeedId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/rss-feeds/rss-feed.html',
							controller: 'RSSFeedController as vm'
						}
					}
				})
				.state('app.rssarticle', {
					url: '/rssfeeds/:rssFeedId/:articleHash',
					views: {
						'menuContent': {
							templateUrl: 'scripts/rss-feeds/rss-article.html',
							controller: 'RSSArticleController as vm'
						}
					}
				});
		});
})();
