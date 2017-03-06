(function() {
	'use strict';

	angular
		.module('barebone.facebook')
		.controller('FacebookAlbumController', FacebookAlbumController);

	FacebookAlbumController.$inject = ['$stateParams', '$scope', '_', 'facebookService'];

	/* @ngInject */
	function FacebookAlbumController($stateParams, $scope, _, facebookService) {
		var albumId = $stateParams.albumId;
		var pageId = $stateParams.pageId;

		var vm = angular.extend(this, {
			photos: [],
			url: null,
			doRefresh: doRefresh,
			loadMore: loadMore
		});

		(function activate() {
			loadPhotos();
		})();

		// ********************************************************************

		function loadPhotos(url) {
			vm.url = url || null;
			return facebookService.getAlbumPhotos(pageId, albumId, url).then(function(response) {
				if (!vm.url) {
					vm.photos = response.data;
				} else {
					vm.photos = vm.photos.concat(response.data);
				}

				vm.url = response.paging.next;
			});
		}

		function doRefresh() {
			loadPhotos().then(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
		}

		function loadMore() {
			loadPhotos(vm.url).then(function() {
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}
	}
})();