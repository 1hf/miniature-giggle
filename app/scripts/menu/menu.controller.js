(function() {
	'use strict';

	angular
		.module('barebone.menu')
		.controller('MenuController', MenuController);

	MenuController.$inject = ['chatsAuthService'];

	/* @ngInject */
	function MenuController(chatsAuthService) {

	}
})();