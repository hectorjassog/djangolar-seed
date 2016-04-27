'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AjoutalbumCtrl
 * @description
 * # AjoutalbumCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AjoutalbumCtrl', function ($scope, Restangular) {
	  var ajoutAlbum = this;
	  ajoutAlbum.year = 2016;
	  ajoutAlbum.added = false;
	  var baseGenre = Restangular.one('genres');
	  

	  baseGenre.get().then(function(genres){
		  ajoutAlbum.genres = genres;
		  //"Unrestangularized" object
		  ajoutAlbum.genres = ajoutAlbum.genres.plain();
		  
	  });
	  
	  ajoutAlbum.addAlbum = function() {
		  var newAlbum = [];
		  var baseAlbum = Restangular.all('album');
		  if (ajoutAlbum.name && ajoutAlbum.artist && ajoutAlbum.year && ajoutAlbum.genre) {
			  newAlbum = {
					  "album_name" : ajoutAlbum.name,
					  "artist" : ajoutAlbum.artist,
					  "year" : ajoutAlbum.year,
					  "genre" : ajoutAlbum.genre
					  };
			  ajoutAlbum.added = true;
			  baseAlbum.post(newAlbum);
		  }
	  }
	  
	  
  });
