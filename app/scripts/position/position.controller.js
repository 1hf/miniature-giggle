(function() {
	'use strict';

	angular
		.module('barebone.position')
		.controller('PositionController', PositionController);

	PositionController.$inject = ['$cordovaGeolocation', '$ionicLoading', 'positionService'];

	/* @ngInject */
	function PositionController($cordovaGeolocation, $ionicLoading, positionService) {
		var vm = angular.extend(this, {
			params: []
		});

		console.log('Before activation ...');
		(function activate() {
			getCurrentPosition()
				.finally(startWatching);
		})();

		// ********************************************************************

		function getCurrentPosition() {
			$ionicLoading.show({
				template: 'Searching for location ...'
			});
			return positionService.getCurrentPosition()
				.then(function(params) {
					vm.params = params;
					alert(params);
				})
				.finally(function() {
					$ionicLoading.hide();
				});
		}

		function startWatching() {
			positionService.startWatching(function(params) {
				console.log(params);
				vm.params = params;
			});
		}
	}
})();
