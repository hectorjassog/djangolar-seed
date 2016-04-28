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
	  var baseGenre = Restangular.one('genres');
	  
	  //Get the list of `Genres` objects from the API
	  baseGenre.get().then(function(genres){
		  ajoutAlbum.genres = genres;
		  //"Unrestangularized" the object
		  ajoutAlbum.genres = ajoutAlbum.genres.plain();
		  
	  });
	  
	  //Add a new album in the API
	  ajoutAlbum.addAlbum = function() {
		  var newAlbum = [];
		  var baseAlbum = Restangular.all('album');
		  //Basical verifications
		  if (ajoutAlbum.name && ajoutAlbum.artist && ajoutAlbum.year && ajoutAlbum.genre) {
			  newAlbum = {
					  "album_name" : ajoutAlbum.name,
					  "artist" : ajoutAlbum.artist,
					  "year" : ajoutAlbum.year,
					  "genre" : ajoutAlbum.genre
					  };
			  
			  baseAlbum.post(newAlbum).then(function(){
				  //Reset the object
				  ajoutAlbum.name = "";
				  ajoutAlbum.artist = "";
				  ajoutAlbum.year = 2016;
				  ajoutAlbum.genre = "Choisir un genre";
			  }).catch(function(error){
				  ajoutAlbum.message = error;			  
			  });
		  }
		  else {
			  ajoutAlbum.message = "Veuillez remplir tous les champs";
		  }
	  };
	  
	  
  });
