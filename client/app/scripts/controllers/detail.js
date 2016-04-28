'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('DetailCtrl', function ($scope, Restangular, $stateParams) {
	var detail = this;
	detail.albumId = $stateParams.albumId;
	//
	var baseAlbum = Restangular.one('album',detail.albumId);

	//Do a get /album/albumId
	baseAlbum.get().then(function(album){
		angular.forEach(album.tracks, function(el, index, arr){
			el.duration = alterDuration(el.duration);
		});
		detail.album = album;
		//Copy the album in a new object that will be used to make some modifications (if needed)
		detail.modifiedAlbum = angular.copy(album);
	});

	//Returns a second format object in the "xx'xx''" format
	var alterDuration = function(duration) {
		var min = Math.floor(duration / 60);
		//Adding 0 before the minutes if it's under 10 (for instance : 8 becomes 08)
		if (min < 10) {
			min = "0"+min;
		}
		var sec = Math.floor(duration % 60);
		//Adding 0 before the secondes if it's under 10 (for instance : 1 becomes 01)
		if (sec < 10) {
			sec = "0"+sec;
		}
		return min + "'" + sec +"''";
	};

	//Add a new track in the API and reload the tracklist
	detail.addTrack = function() {
		var createdTrack = [];
		var baseTrack = baseAlbum.all('track');
		//Basical verification
		if (detail.newTrack.order && detail.newTrack.title && detail.newTrack.duration) {
			//Create a new track object
			createdTrack = {
					"order" : detail.newTrack.order,
					"title" : detail.newTrack.title,
					"duration" : detail.newTrack.duration
			};
			//POST the created track object
			baseTrack.post(createdTrack).then(function(){
				//Reset the object
				detail.newTrack.order = 0;
				detail.newTrack.title = "Titre";
				detail.newTrack.duration = 0;
				//Get the new list of track by getting the album
				baseAlbum.get().then(function(album){
					angular.forEach(album.tracks, function(el, index, arr){
						el.duration = alterDuration(el.duration);
					});
					detail.album = album;
				});
			})
			.catch(function(error) {
				//Shows the message error
				detail.message = error.data.non_field_errors;
			});
		}else {
			detail.message = "Merci de bien vouloir remplir tous les champs";
		}
	};

	//Modify the selected album with the modifiedAlbum object
	detail.modifyAlbum = function() {
		//Copy the modified album in the baseAlbum object that is refering to the get /album/id of the API
		baseAlbum = Restangular.copy(detail.modifiedAlbum);
		//Do a PUT (or POST) of the modified album
		baseAlbum.save().then(function(){
			//Do a GET on the album to display the new informations
			baseAlbum.get().then(function(album){
				angular.forEach(album.tracks, function(el, index, arr){
					el.duration = alterDuration(el.duration);
				});
				detail.album = album;
				//Copy the album in a new object that will be used to make some modifications (if needed)
				detail.modifiedAlbum = angular.copy(album);
			});

		});
	};

	//Delete the selected track referenced by its track order (deleting is not allowed with track id)
	detail.deleteTrack = function(trackOrder) {
		//asking for a confirmation in the window
		if(window.confirm("Supprimer l'album ?")) {
			//remove the track. The album needs to be selected and THEN we can select the track 
			var oneTrack = Restangular.one('album', detail.albumId).one('track', trackOrder).remove().then(function(){
				//Get the new list of track by getting the album
				baseAlbum.get().then(function(album){
					angular.forEach(album.tracks, function(el, index, arr){
						el.duration = alterDuration(el.duration);
					});
					//assign the getted album in the scope
					detail.album = album;
					//Copy the album in a new object that will be used to make some modifications (if needed)
					detail.modifiedAlbum = angular.copy(album);
				});
			});

		}
	};
	//GET the genres object from the API (/genres/
	var baseGenre = Restangular.one('genres');
	//GET the list of `Genres` objects from the API
	baseGenre.get().then(function(genres){
		detail.genres = genres;
		//"Unrestangularized" the object
		detail.genres = detail.genres.plain();

	});
});
