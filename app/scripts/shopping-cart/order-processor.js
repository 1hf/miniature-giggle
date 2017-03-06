(function() {
	'use strict';

	angular
		.module('barebone.shopping-cart')
		.factory('orderProcessor', orderProcessor);

	orderProcessor.$inject = ['$filter', '$cordovaEmailComposer', '_', 'externalAppsService'];

	/* @ngInject */
	function orderProcessor($filter, $cordovaEmailComposer, _, externalAppsService) {
		var recipient = 'foo@bar.com';
		var service = {
			processOrder: processOrder
		};
		return service;

		// ************************************************

		function formatAmount(amount, currency) {
			return $filter('currency')(amount, currency, 2);
		}

		function processOrder(cart, currency) {
			var order = '';
			var total = 0;

			_.each(cart, function(item) {
				var itemTotal = item.price * item.quantity;
				total += itemTotal;
				order +=
					item.name + ' ' +
					item.quantity + 'x ' +
					formatAmount(item.price, currency) + ' ' +
					formatAmount(itemTotal, currency) + '</br>';
			});

			order += '</br>';
			order += 'Total: ' + formatAmount(total, currency);

			return sendOrder(order);
		}

		function sendOrder(order) {
			var subject = generateSubject();

			try {
				return $cordovaEmailComposer.isAvailable().then(function() {
					var email = {
						to: recipient,
						subject: subject,
						body: order
					};

					$cordovaEmailComposer.open(email);
				});
			} catch (e) {

				return new Promise(function(resolve, reject) {
				  // do a thing, possibly async, then…
  				reject('$cordovaEmailComposer is not available or failed. Are you running the app within a browser?');
				});

			} finally {

			}

		}

		function generateSubject() {
			return 'Barebone Store - Order No ' + Math.floor((Math.random() * 9000) + 1000);
		}
	}
})();
