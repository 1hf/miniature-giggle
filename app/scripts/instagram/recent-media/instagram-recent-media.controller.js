(function() {
	'use strict';

	angular
		.module('barebone.instagram')
		.controller('InstagramRecentMediaController', InstagramRecentMediaController);

	InstagramRecentMediaController.$inject = ['$scope', 'instagramService', '$http'];

	/* @ngInject */
	function InstagramRecentMediaController($scope, instagramService, $http) {
		var vm = angular.extend(this, {
			mediaList: [],
			doRefresh: doRefresh
		});

		(function activate() {
			getRecentMedia();
		})();

		// ********************************************************************

		function getRecentMedia() {
			return instagramService.getRecentMedia().then(function(list) {
				vm.mediaList = list;
			});
		}

		function doRefresh() {
			getRecentMedia().then(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
		}
	}
})();