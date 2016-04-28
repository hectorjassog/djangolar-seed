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
	//GET the genres object from the API (/genres/
	var baseGenre = Restangular.one('genres');
	//GET the list of `Genres` objects from the API
	baseGenre.get().then(function(genres){
		main.genres = genres;
		//"Unrestangularized" the object
		main.genres = main.genres.plain();

	});
	//GET the list of album in main.allAlbum and associates the genre to its value
	baseAlbum.getList().then(function(albums){
		angular.forEach(albums, function(el, index, arr){
			el.genre = main.genres[el.genre];
		});
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
