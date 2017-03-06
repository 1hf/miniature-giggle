(function() {
	'use strict';

	angular
		.module('barebone.sqlite')
		.controller('SQLiteController', SQLiteController);

	SQLiteController.$inject = ['sqliteService', '_', '$ionicListDelegate', 'editSqliteItemService'];

	/* @ngInject */
	function SQLiteController(sqliteService, _, $ionicListDelegate, editSqliteItemService) {
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
			sqliteService.deleteItem(id).then(function() {
				vm.items = _.remove(vm.items, function(item) {
					return item.id !== id;
				}); 
			});
		}

		function updateItem(item) {
			$ionicListDelegate.closeOptionButtons();
			
			editSqliteItemService.show(item.title, item.teaser).then(function(result) {
				if (result.canceled) {
					return;
				}
				
				item.title = result.title;
				item.teaser = result.teaser;

				sqliteService.updateItem(item);
			});
		}

		function selectAll() {
			sqliteService.selectAll().then(function(items) {
				vm.items = items;
			});
		}
		
		function addItem() {
			editSqliteItemService.show().then(function(result) {
				if (result.canceled) {
					return;
				}
				
				var item = {
					title: result.title,
					teaser: result.teaser
				};

				sqliteService.insert(item).then(function(item) {
					vm.items.push(item);
				});
			});
		}
	}
})();