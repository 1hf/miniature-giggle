(function() {
	'use strict';

	angular
		.module('barebone.stream')
		.factory('streamService', streamService);

	streamService.$inject = [];

	function streamService() {
		var data = {
			//
			// find more strams at
			// http://www.listenlive.eu/
			//
			// eg: http://raj.krone.at:80/kronehit-hp.mp3
			//     mms://apasf.apa.at/OE3_Live_Audio
			//
			audioStream: 'http://stream-dc1.radioparadise.com/mp3-128'
		};
		return data;
	}
})();
