'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('MainCtrl', function ($scope, Restangular) {
	var main = this;

	//refers to the API /album
	var baseAlbum = Restangular.all('album');

	//GET the list in main.allAlbum
	baseAlbum.getList().then(function(albums){
		main.allAlbums = albums; 
	});

	//DELETE the selected album by its id
	main.delete = function(albumId) {
		if(window.confirm("Supprimer l'album ?")) {
			var oneAlbum = Restangular.one('album', albumId).remove().then(function(){
				//Get the list of albums
				baseAlbum.getList().then(function(albums){
					main.allAlbums = albums; 
				});
			});

		}
	};
});
