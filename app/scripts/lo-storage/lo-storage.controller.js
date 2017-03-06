(function() {
	'use strict';

	angular
		.module('barebone.lo-storage')
		.controller('LoStorageController', LoStorageController);

	LoStorageController.$inject = ['loStorageService', '_', '$ionicListDelegate', 'editLoStorageItemService'];

	/* @ngInject */
	function LoStorageController(loStorageService, _, $ionicListDelegate, editLoStorageItemService) {
		var vm = angular.extend(this, {
			items: [],
			addItem: addItem,
			deleteItem: deleteItem,
			updateItem: updateItem
		});

		(function activate() {
			selectAll();
		})();

		// ********************************************************************

		function deleteItem(id) {
			loStorageService.deleteItem(id).then(function() {
				vm.items = _.remove(vm.items, function(item) {
					return item.id !== id;
				}); 
			});
		}

		function updateItem(item) {
			$ionicListDelegate.closeOptionButtons();
			
			editLoStorageItemService.show(item.title, item.teaser).then(function(result) {
				if (result.canceled) {
					return;
				}

				item.title = result.title;
				item.teaser = result.teaser;

				loStorageService.updateItem(item);
			});
		}

		function selectAll() {
			loStorageService.selectAll().then(function(items) {
				vm.items = items;
			});
		}
		
		function addItem() {
			editLoStorageItemService.show().then(function(result) {
				if (result.canceled) {
					return;
				}

				var item = {
					title: result.title,
					teaser: result.teaser
				};

				loStorageService.insert(item).then(function(item) {
					vm.items.push(item);
				});
			});
		}
	}
})();