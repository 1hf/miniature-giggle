(function() {
	'use strict';

	angular
		.module('barebone.vimeo')
		.filter('vimeoEmbedUrl', vimeoEmbedUrl);

	vimeoEmbedUrl.$inject = ['$sce'];

	/* @ngInject */
	function vimeoEmbedUrl($sce) {
		return function(videoId) {
			return $sce.trustAsResourceUrl('http://player.vimeo.com/video/' + videoId);
		};
	}
})();
