(function() {
	'use strict';

	angular
		.module('barebone.galleries')
		.controller('GalleryController', GalleryController);

	GalleryController.$inject = ['$stateParams', 'galleriesService'];

	/* @ngInject */
	function GalleryController($stateParams, galleriesService) {
		var galleryId = parseInt($stateParams.galleryId, 10);
		var pictureIndex = parseInt($stateParams.pictureIndex, 10) || 0;

		var vm = angular.extend(this, {
			pictures: [],
			pictureIndex: pictureIndex
		});

		// ********************************************************************

		galleriesService.get(galleryId)
			.then(function(gallery) {
				vm.pictures = gallery.pictures;
			});
	}
})();