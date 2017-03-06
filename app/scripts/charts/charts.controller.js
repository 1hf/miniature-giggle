(function() {
	'use strict';

	angular
		.module('barebone.charts')
		.controller('ChartsController', ChartsController);

	ChartsController.$inject = ['$ionicLoading'];

	/* @ngInject */
	function ChartsController($ionicLoading) {
		var chartsToRender = 2;

		var vm = angular.extend(this, {
			columnChart: null,
			pieChart: null,
			onReady: onReady
		});

		(function activate() {
			vm.columnChart = createColumnChart();
			vm.pieChart = createPieChart();

			$ionicLoading.show({
				template: 'Rendering ...'
			});
		})();
		// ********************************************************************

		function createColumnChart() {
			return {
				type: 'ColumnChart',
				data: {
					'cols': [{
						id: 'month',
						label: 'Month',
						type: 'string'
					}, {
						id: 'laptop-id',
						label: 'Laptop',
						type: 'number'
					}, {
						id: 'desktop-id',
						label: 'Desktop',
						type: 'number'
					}, {
						id: 'server-id',
						label: 'Server',
						type: 'number'
					}, {
						id: 'cost-id',
						label: 'Shipping',
						type: 'number'
					}],
					'rows': [{
						c: [{
							v: 'January'
						}, {
							v: 19,
							f: '42 items'
						}, {
							v: 12,
							f: 'Ony 12 items'
						}, {
							v: 7,
							f: '7 servers'
						}, {
							v: 4
						}]
					}, {
						c: [{
							v: 'February'
						}, {
							v: 13
						}, {
							v: 1,
							f: '1 unit (Out of stock this month)'
						}, {
							v: 12
						}, {
							v: 2
						}]
					}, {
						c: [{
								v: 'March'
							}, {
								v: 24
							}, {
								v: 0
							}, {
								v: 11
							}, {
								v: 6
							}

						]
					}]

				},
				options: {
					'title': 'Sales per month',
					'isStacked': 'true',
					'fill': 20,
					'displayExactValues': true,
					'vAxis': {
						'title': 'Sales unit',
						'gridlines': {
							'count': 6
						}
					},
					'hAxis': {
						'title': 'Date'
					}
				}
			};
		}

		function createPieChart() {
			var chart = {};
			chart.type = 'PieChart';
			chart.data = [
				['Task', 'Hours per Day'],
				['Work', 11],
				['Eat', 2],
				['Commute', 2],
				['Watch TV', 2],
				['Sleep', 7]
			];
			chart.options = {
				title: 'My Daily Activities',
				chartArea: {
					left: 40,
					top: 40,
					width: '100%',
					height: '100%'
				}
			};
			return chart;
		}

		function onReady() {
			chartsToRender--;
			if (chartsToRender === 0) {
				$ionicLoading.hide();
			}
		}
	}
})();