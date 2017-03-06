(function() {
	'use strict';

	var DB_NAME = 'my.db';

	angular
		.module('barebone.sqlite')
		.factory('sqliteService', sqliteService);

	sqliteService.$inject = ['$q', '$cordovaSQLite'];

	/* @ngInject */
	function sqliteService($q, $cordovaSQLite) {
		var db;
		initDb();

		var service = {
			selectAll: selectAll,
			insert: insert,
			deleteItem: deleteItem,
			updateItem: updateItem
		};
		return service;

		function initDb() {
			db = $cordovaSQLite.openDB({ name: DB_NAME });
			$cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS items (id integer primary key, title text, teaser text)');
		}

		function deleteItem(id) {
			var query = 'DELETE FROM items WHERE id = ?';
			return $cordovaSQLite.execute(db, query, [id]);
		}

		function updateItem(item) {
			var query = 'UPDATE items SET title = ?, teaser = ? WHERE id = ?';
			return $cordovaSQLite.execute(db, query, [item.title, item.teaser, item.id]);
		}

		function selectAll() {
			var query = 'SELECT id, title, teaser FROM items';
			return $cordovaSQLite.execute(db, query).then(function(res) {
				var items = [];

				if(res.rows.length > 0) {
					for (var i = 0; i < res.rows.length; i++) {
						var item = res.rows.item(i);

						items.push({
							id: item.id,
							title: item.title,
							teaser: item.teaser
						});
					}
				} else {
					console.log('No results found');
				}

				return items;
			}, function (err) {
				console.error(err);
			});
		}

		function insert(item) {
			var query = 'INSERT INTO items (title, teaser) VALUES (?, ?)';
			return $cordovaSQLite.execute(db, query, [item.title, item.teaser]).then(function(res) {
				item.id = res.insertId;
				return item;
			}, function (err) {
				console.error(err);
				alert(err);
			});
		}
	}
})();
