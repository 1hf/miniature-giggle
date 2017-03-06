(function() {
	'use strict';

	angular
		.module('barebone.stream')
		.controller('StreamController', StreamController);

	StreamController.$inject = ['streamService'];

	var isPlaying = false;
	var stream;

	/* @ngInject */
	function StreamController(streamService) {

		var vm = angular.extend(this, {
			togglePlay: togglePlay,
			isPlaying: isPlaying
		});

		// ********************************************************************

		function togglePlay() {
			if (vm.isPlaying) {
				pause();
			} else {
				play();
			}

			vm.isPlaying = isPlaying = !isPlaying;
		}

		function play() {
			try {
				stream = new window.Stream(streamService.audioStream);
				// Play audio
				stream.play();

			} catch (Error) {
				alert(Error);
			}
		}

		function pause() {
			if (!stream) {
				return;
			}

			stream.stop();
		}
	}
})();
