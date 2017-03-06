(function() {
	'use strict';

	angular
		.module('barebone.restaurant-delivery')
		.controller('HomeDeliveryController', HomeDeliveryController);

	HomeDeliveryController.$inject = [
		'restaurantCartService', 'restaurantOrderProcessor', 'restaurantInfoService', '$ionicHistory', '$state'];

	/* @ngInject */
	function HomeDeliveryController(restaurantCartService, restaurantOrderProcessor, restaurantInfoService, $ionicHistory, $state) {
		var vm = angular.extend(this, {
			submit: submit,
			form: {
				firstName: null,
				lastName: null,
				phoneNumber: null,
				zipCode: null,
				address: null
			}
		});

		(function activate() {
		})();

		// ********************************************************************

		function submit(form) {
			angular.forEach(form, function(obj) {
				if(angular.isObject(obj) && angular.isDefined(obj.$setDirty)) { 
					obj.$setDirty();
				}
			})
			
			if (form.$valid) {
				performHomeDelivery();
			}
		}

		function performHomeDelivery() {
			var items = restaurantCartService.getAll();
			restaurantOrderProcessor.performHomeDelivery(items, vm.form, restaurantInfoService.restaurant.email).then(function() {
				restaurantCartService.flush();
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$state.go('app.restaurant-catalogue');
			}, function() {
				alert("Error when sending email");
			});
		}
	}
})();
