(function() {
	'use strict';

	angular
		.module('barebone.facebook')
		.controller('FacebookAlbumsController', FacebookAlbumsController);

	FacebookAlbumsController.$inject = ['$state', '$stateParams', 'facebookService'];

	/* @ngInject */
	function FacebookAlbumsController($state, $stateParams, facebookService) {
		var pageId = $stateParams.pageId;

		var vm = angular.extend(this, {
			albums: [],
			showAlbum: showAlbum
		});

		(function activate() {
			loadAlbums();
		})();

		// ********************************************************************

		function loadAlbums() {
			facebookService.getAlbums(pageId).then(function(response) {
				vm.albums = response.data;
			});
		}

		function showAlbum(id) {
			$state.go('app.facebook-album', {
				albumId: id,
				pageId: pageId
			});
		}
	}
})();