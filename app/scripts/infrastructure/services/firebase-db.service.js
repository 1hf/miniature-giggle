(function() {
	'use strict';

	angular
		.module('barebone.infrastructure')
		.factory('firebaseDb', firebaseDb);

	firebaseDb.$inject = ['ENV'];

	/* @ngInject */
	function firebaseDb(ENV) {
		firebase.initializeApp(ENV.firebaseConfig);
		var db = firebase.database().ref();
		return db;
	}
})();