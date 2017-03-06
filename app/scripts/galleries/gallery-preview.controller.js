(function() {
	'use strict';

	angular
		.module('barebone.galleries')
		.controller('GalleryPreviewController', GalleryPreviewController);

	GalleryPreviewController.$inject = ['$state', '$stateParams', '_', 'galleriesService'];

	/* @ngInject */
	function GalleryPreviewController($state, $stateParams, _, galleriesService) {
		var galleryId = parseInt($stateParams.galleryId, 10);
		var pictures = [];

		var vm = angular.extend(this, {
			groupedPictures: [],
			navigateToFullGalleryView: navigateToFullGalleryView
		});

		// ********************************************************************

		galleriesService.get(galleryId)
			.then(function(gallery) {
				pictures = gallery.pictures;
				vm.groupedPictures = _.chunk(gallery.pictures, 3);
			});

		function navigateToFullGalleryView(picture) {
			var pictureIndex = _.indexOf(pictures, picture);
			$state.go('app.gallery', {
				galleryId: galleryId,
				pictureIndex: pictureIndex
			});
		}
	}
})();