(function() {
	'use strict';

	angular
		.module('barebone.restaurant-delivery')
		.controller('TakeAwayController', TakeAwayController);

	TakeAwayController.$inject = [
		'restaurantCartService', 'restaurantOrderProcessor',
		'$rootScope', '$ionicPopup', 'restaurantInfoService', '$ionicHistory', '$state'];

	/* @ngInject */
	function TakeAwayController(
		restaurantCartService, restaurantOrderProcessor, $rootScope, $ionicPopup, restaurantInfoService, $ionicHistory, $state) {
		var location = restaurantInfoService.location;

		var vm = angular.extend(this, {
			confirm: confirm,
			restaurant: restaurantInfoService.restaurant,
			location: {
				origin: location.origin,
				zoom: location.zoomLevel,
				markers: [{
					lat: location.origin.lat,
					lon: location.origin.lon,
					name: restaurantInfoService.restaurant.name
				}]
			}
		});

		(function activate() {
		})();

		// ********************************************************************

		function confirm() {
			var popup = createConfirmationPopup();

			return $ionicPopup.show(popup).then(function(result) {
				if (result.canceled) {
					return;
				}

				var items = restaurantCartService.getAll();
				restaurantOrderProcessor.sendTakeAwayConfirmation(items, restaurantInfoService.restaurant, result.email)
					.then(function() {
						restaurantCartService.flush();
						$ionicHistory.nextViewOptions({
							disableBack: true
						});
						$state.go('app.restaurant-catalogue');
					}, function() {
						alert("Error when sending email");
					});
			});
		}
		
		function createConfirmationPopup() {
			var scope = $rootScope.$new();
			scope.data = {
				email: null
			};

			return {
				templateUrl: 'scripts/restaurant-catalogue/restaurant-delivery/take-away/delivery-confirmation.html',
				title: 'Confirmation dialog',
				subTitle: 'Email',
				scope: scope,
				buttons: [{
					text: 'Cancel',
					onTap: function(e) {
						scope.data.canceled = true;
						return scope.data;
					}
				}, {
					text: '<b>Confirm</b>',
					type: 'button-positive',
					onTap: function(e) {
						var email = scope.data.email;
						if (email && email.length > 3) {
							return scope.data;
						} else {
							alert('Enter correct email');
							e.preventDefault();
						}
					}
				}]
			};
		}
	}
})();
