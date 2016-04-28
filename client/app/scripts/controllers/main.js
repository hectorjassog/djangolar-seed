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

	//Get /album
	var baseAlbum = Restangular.all('album');

	//Put the answer in main.allAlbum
	baseAlbum.getList().then(function(albums){
		main.allAlbums = albums; 
	});

	main.delete = function(albumId) {
		if(window.confirm("Supprimer l'album ?")) {
			var oneAlbum = Restangular.one('album', albumId).remove().then(function(){
				baseAlbum.getList().then(function(albums){
					main.allAlbums = albums; 
				});
			});

		}
	};
});
