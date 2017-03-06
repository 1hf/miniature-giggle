(function () {
	'use strict';

	angular
		.module('barebone.ad')
		.controller('AdController', AdController);

	AdController.$inject = ['$scope', 'adService'];

	/* @ngInject */
	function AdController($scope, adService) {
		var vm = angular.extend(this, {
			isPluginLoaded: adService.isPluginLoaded()
		});

		// ********************************************************************

		$scope.$on('$ionicView.loaded', function (viewInfo, state) {
			adService.showBanner();
		});

		$scope.$on('$ionicView.unloaded', function (viewInfo, state) {
			adService.hideBanner();
		});
	}
})();