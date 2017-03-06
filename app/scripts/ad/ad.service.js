(function () {
	'use strict';

	angular
		.module('barebone.ad')
		.factory('adService', adService);

	adService.$inject = ['ENV', '$cordovaAdMob'];

	/* @ngInject */
	function adService(ENV, $cordovaAdMob) {
		var service = {
			showBanner: showBanner,
			hideBanner: hideBanner,
			isPluginLoaded: isPluginLoaded
		};
		return service;

		// ************************************************

		function showBanner() {
			if (!isPluginLoaded()) {
				return;
			}

			var admobid = {};
			if (/(android)/i.test(navigator.userAgent)) { // for android & amazon-fireos
				admobid = {
					banner: ENV.androidPublisherKey
				};
			} else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
				admobid = {
					banner: ENV.iosPublisherKey
				};
			}

			window.AdMob.createBanner({
				adId: admobid.banner,
				position: window.AdMob.AD_POSITION.BOTTOM_CENTER, 
				autoShow: true
			});
		}

		function hideBanner() {
			if (!isPluginLoaded()) {
				return;
			}

			window.AdMob.hideBanner();
		}

		function isPluginLoaded() {
			return window.AdMob;
		}
	}
})();