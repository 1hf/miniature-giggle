(function () {
	'use strict';

	angular
		.module('barebone.stripe')
		.controller('StripeController', StripeController);

	StripeController.$inject = ['stripeService'];

	/* @ngInject */
	function StripeController(stripeService) {
		var types = ['Visa', 'American Express', 'MasterCard'];
		var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		var years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2025];
		var card = {
			cardType: types[0],
			exp_month: 1,
			exp_year: 2020
		};

		var vm = angular.extend(this, {
			types: types,
			months: months,
			years: years,
			card: card,
			makeStripePayment: makeStripePayment,
			convertToInt: convertToInt,
		});

		// ********************************************************************

		// card.expirationDate.getFullYear()
		// card.expirationDate.getMonth()

		function makeStripePayment(card) {
			stripeService.makePayment(card, "Barebone Ionic stripe integration test")
					.then(function(response) {
						console.log(JSON.stringify(response));
						alert('The payment has been made. Status = ' + response.status);
					}, function(response) {
						alert(response);
					});
		}

		function convertToInt(id){
    	return parseInt(id, 10);
		};


	}
})();
