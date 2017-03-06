(function() {
	'use strict';

	angular
		.module('barebone.lo-storage')
		.factory('editLoStorageItemService', editLoStorageItemService);

	editLoStorageItemService.$inject = ['$rootScope', '$ionicModal', '$q'];

	/* @ngInject */
	function editLoStorageItemService($rootScope, $ionicModal, $q) {
		var scope = createModal();
		var service = {
			show: show
		};
		return service;
		
		// ***************************************************

		function show(title, teaser) {
			var defer = $q.defer();

			scope.data = {
				title: title,
				teaser: teaser
			}

			scope.cancel = function() {
				scope.modal.hide();
				defer.reject();
			}
			scope.save = function() {
				if (scope.data.title && scope.data.teaser) {
					scope.modal.hide();
					defer.resolve({
						title: scope.data.title,
						teaser: scope.data.teaser
					});
				} else {
					alert('Title and teaser should be filled');
				}
			}

			scope.modal.show();
			return defer.promise;
		}

		function createModal() {
			var scope = $rootScope.$new();

			$ionicModal.fromTemplateUrl('scripts/lo-storage/edit-lo-storage-item.html', {
				scope: scope
			}).then(function(modal) {
				scope.modal = modal;
			});

			return scope;
		}
	}
})();
