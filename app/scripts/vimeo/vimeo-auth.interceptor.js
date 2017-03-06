(function() {
	'use strict';

	angular
		.module('barebone.vimeo')
		.config(function($httpProvider) {
			$httpProvider.interceptors.push(function($rootScope, ENV) {
				return {
					request: function(config) {
						if (config.url.indexOf('api.vimeo.com') > 0) {
							config.headers['Authorization'] = 'bearer ' + ENV.vimeoAccessToken;
						}
						return config;
					},
					response: function(response) {
						return response;
					}
				};
			});
		});
})();




