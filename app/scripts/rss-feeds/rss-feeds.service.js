(function() {
	'use strict';

	angular
		.module('barebone.rss-feeds')
		.factory('rssFeedsService', rssFeedsService);

	rssFeedsService.$inject = ['$http', '$q', '_', '$base64'];

	/* @ngInject */
	function rssFeedsService($http, $q, _, $base64) {
		var feedList = [];
		var entries = [];

		var service = {
			getFeedList: getFeedList,
			getFeed: getFeed,
			getArticle: getArticle
		};
		return service;

		// *******************************************************

		function getFeed(feedId) {
			if (!feedList.length) {
				getFeedList();
			}

			var deferred = $q.defer();

			var url = _.find(feedList, 'id', feedId).url;

			$http.get('http://ajax.googleapis.com/ajax/services/feed/load', {
				params: {
					v: '1.0',
					q: url,
					num: 100
				}
			})
			.success(function(response) {
				entries = response.responseData.feed.entries;
				_.each(entries, function(entry) {
					var length = entry.content.indexOf('<p>The post');
					if (length > 0) {
						entry.content = entry.content.substring(0, length);
					}
					entry.hash = $base64.encode(entry.link);
				});
				deferred.resolve(entries);
			})
			.error(function() {
				deferred.reject();
			});

			return deferred.promise;
		}

		function getArticle(feedId, hash) {
			if (!entries.length) {
				var deferred = $q.defer();

				getFeed(feedId)
					.then(function() {
						var entry = _.find(entries, 'hash', hash);
						deferred.resolve(entry);
					});

				return deferred.promise;
			}

			var entry = _.find(entries, 'hash', hash);
			return $q.when(entry);
		}

		function getFeedList() {
			entries = [];

			// Wired RSS Feeds
			// http://www.wired.com/about/rss_feeds/
			//

			feedList = [{
				id: 1,
				title: 'Top Stories',
				url: 'http://feeds.wired.com/wired/index'
			}, {
				id: 2,
				title: 'Business',
				url: 'http://www.wired.com/category/business/feed/'
			}, {
				id: 3,
				title: 'Design',
				url: 'http://www.wired.com/category/design/feed/'
			}, {
				id: 4,
				title: 'Entertainment',
				url: 'http://www.wired.com/category/underwire/feed/'
			}, {
				id: 5,
				title: 'Tech',
				url: 'http://www.wired.com/category/gear/feed/'
			},  {
				id: 6,
				title: 'Product Reviews',
				url: 'http://www.wired.com/category/reviews/feed/'
			},  {
				id: 7,
				title: 'Science',
				url: 'http://www.wired.com/category/science/science-blogs/feed/'
			}];

			return $q.when(feedList);
		}
	}
})();
