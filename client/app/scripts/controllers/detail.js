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
			//Create a new object
			createdTrack = {
					"order" : detail.newTrack.order,
					"title" : detail.newTrack.title,
					"duration" : detail.newTrack.duration
			};
			//Post the created object
			baseTrack.post(createdTrack).then(function(){
				//Reset the object
				detail.newTrack.order = 0;
				detail.newTrack.title = "Titre";
				detail.newTrack.duration = 0;
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
		baseAlbum = Restangular.copy(detail.modifiedAlbum);
		baseAlbum.save().then(function(){
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
	
	
	detail.deleteTrack = function(trackOrder) {
		if(window.confirm("Supprimer l'album ?")) {
			var oneTrack = Restangular.one('album', detail.albumId).one('track', trackOrder).remove().then(function(){
				baseAlbum.get().then(function(album){
					angular.forEach(album.tracks, function(el, index, arr){
						el.duration = alterDuration(el.duration);
					});
					detail.album = album;
					//Copy the album in a new object that will be used to make some modifications (if needed)
					detail.modifiedAlbum = angular.copy(album);
				});
			});

		}
	}
});
