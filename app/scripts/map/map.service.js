(function() {
	'use strict';

	angular
		.module('barebone.map')
		.factory('mapService', mapService);

	mapService.$inject = [];

	/* @ngInject */
	function mapService() {
		var data = {
			origin: {
					latitude : 37.407,
					longitude : -122.1
			},
			zoomLevel: 15,
			annotations : [{
					title : 'ICMDA UK TRUST',
					latitude : 51.543245,
					longitude : -3.258877
			}, {
					title : 'Ullamcorper eros.',								
					latitude : 37.41,
					longitude : -122.1
			}]
		};
		return data;
	}
})();
