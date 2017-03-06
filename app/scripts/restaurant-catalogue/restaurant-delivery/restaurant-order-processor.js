(function() {
	'use strict';

	angular
		.module('barebone.restaurant-delivery')
		.factory('restaurantOrderProcessor', restaurantOrderProcessor);

	restaurantOrderProcessor.$inject = ['$filter', '$cordovaEmailComposer', '_', 'externalAppsService', '$q'];

	/* @ngInject */
	function restaurantOrderProcessor($filter, $cordovaEmailComposer, _, externalAppsService, $q) {
		var service = {
			performHomeDelivery: performHomeDelivery,
			sendTakeAwayConfirmation: sendTakeAwayConfirmation
		};
		return service;

		// ************************************************

		function sendTakeAwayConfirmation(cart, restaurant, confirmationEmail) {
			var confirmation = '';

			confirmation += '<b>Restaurant info:</b>'
			confirmation += '<br/>';
			confirmation += 'Restaurant name: ' + restaurant.name + '<br/>'
			confirmation += 'Address: ' + restaurant.address + '<br/>'

			confirmation += '<br/>';
			confirmation += '<b>Items:</b>';
			confirmation += '<br/>';
			
			confirmation += formatItemsList(cart);

			var subject = generateSubject();
			return sendEmail(confirmationEmail, subject, confirmation);
		}

		function performHomeDelivery(cart, deliveryData, restaurantEmail) {
			var order = '';

			order += '<b>Delivery info:</b>'
			order += '<br/>';
			order += 'First name: ' + deliveryData.firstName + '<br/>'
			order += 'Last name: ' + deliveryData.lastName + '<br/>'
			order += 'Address: ' + deliveryData.address + '<br/>'
			order += 'Zip code: ' + deliveryData.zipCode + '<br/>'
			order += 'Phone number: ' + deliveryData.phoneNumber + '<br/>'

			order += '<br/>';
			order += '<b>Items:</b>';
			order += '<br/>';
			
			order += formatItemsList(cart);

			var subject = generateSubject();
			return sendEmail(restaurantEmail, subject, order);
		}

		function formatItemsList(cart) {
			var order = '';
			var total = 0;
			var currency = '$'
			_.each(cart, function(item) {
				var itemTotal = item.price * item.quantity;
				currency = item.currency;
				total += itemTotal;
				order +=
					item.name + ' ' +
					item.quantity + 'x ' +
					formatAmount(item.price, item.currency) + ' ' +
					formatAmount(itemTotal, item.currency) + '<br/>';
			});

			order += '<br/>';
			order += 'Total: ' + formatAmount(total, currency);
			return order;
		}

		function sendEmail(to, subject, body) {
			try {
				return $cordovaEmailComposer.isAvailable().then(function() {
					var email = {
						to: to,
						subject: subject,
						body: body
					};

					$cordovaEmailComposer.open(email);
				});
			} catch (e) {
				return $q.reject('$cordovaEmailComposer is not available or failed. Are you running the app within a browser?');
			}
		}

		function generateSubject() {
			return 'Restaurant catalogue - Order No ' + Math.floor((Math.random() * 9000) + 1000);
		}
		
		function formatAmount(amount, currency) {
			return $filter('currency')(amount, currency, 2);
		}
	}
})();
