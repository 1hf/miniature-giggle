(function() {
	'use strict';

	angular
		.module('barebone.rss-feeds')
		.controller('RSSArticleController', RSSArticleController);

	RSSArticleController.$inject = ['$stateParams', '$ionicActionSheet', 'rssFeedsService'];

	/* @ngInject */
	function RSSArticleController($stateParams, $ionicActionSheet, rssFeedsService) {
		var articleHash = $stateParams.articleHash;
		var feedId = parseInt($stateParams.rssFeedId, 10);

		var vm = angular.extend(this, {
			article: null,
			showActions: showActions,
			showInBrowser: showInBrowser
		});

		// ********************************************************************

		function getArticle(articleHash) {
			rssFeedsService.getArticle(feedId, articleHash)
				.then(function(article) {
					vm.article = article;
				});
		}
		getArticle(articleHash);

		function showActions() {
			$ionicActionSheet.show({
				buttons: [
					{ text: 'Open in browser' },
					{ text: 'Share' }
				],
				titleText: 'Actions',
				cancelText: 'Cancel',
					buttonClicked: function(index) {
						switch(index) {
							case 0:
								showInBrowser(vm.article.link);
								break;
						}
						return true;
				}
			});
		}

		function showInBrowser(link) {
			window.open(link, '_system');
		}
	}
})();