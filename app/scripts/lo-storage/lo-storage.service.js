(function() {
	'use strict';

	angular
		.module('barebone.lo-storage')
		.factory('loStorageService', sqliteService);

	sqliteService.$inject = ['$q', 'localStorageService', '_'];

	/* @ngInject */
	function sqliteService($q, localStorageService, _) {
		var itemsKey = 'items-key';
		initLocalStorage();

		var service = {
			selectAll: selectAll,
			insert: insert,
			deleteItem: deleteItem,
			updateItem: updateItem
		};
		return service;

		function initLocalStorage() {
			var items = getItems();
			if (!items) {
				setItems([]);
			}
		}

		function deleteItem(id) {
			var items = getItems();
			_.remove(items, function(item) {
				return item.id === id;
			});
			setItems(items);
			return $q.when(id); 
		}

		function updateItem(item) {
			var items = getItems();
			var loItem = _.find(items, function(loItem) {
				return loItem.id === item.id;
			});

			loItem.title = item.title; 
			loItem.teaser = item.teaser; 

			setItems(items);
			return $q.when(item);
		}

		function selectAll() {
			var items = getItems();
			return $q.when(items);
		}

		function insert(item) {
			var items = getItems();

			var max;
			if (items.length === 0) {
				max = 0;
			} else {
				max = _.max(items, function(item) {
					return item.id;
				}).id;
			}

			item.id = max + 1;
			items.push(item);
			setItems(items);

			return $q.when(item);
		}

		function getItems() {
			return localStorageService.get(itemsKey);
		}
		
		function setItems(items) {
			localStorageService.set(itemsKey, items);
		}
	}
})();
