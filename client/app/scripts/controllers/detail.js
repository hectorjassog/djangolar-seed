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
	  
	  var baseAlbum = Restangular.one('album',$stateParams.albumId);
	  
	  //Do a get /album/albumId
	  baseAlbum.get().then(function(album){
		  angular.forEach(album.tracks, function(el, index, arr){
			  el.duration = alterDuration(el.duration);
		  });
		  detail.album = album;
	  });
	  
	  //Returns a second format object in the "xx'xx''" format
	  var alterDuration = function(duration) {
		  var min = Math.floor(duration / 60);
		  if (min < 10) {
			  min = "0"+min;
		  }
		  var sec = Math.floor(duration % 60);
		  if (sec < 10) {
			  sec = "0"+sec;
		  }
		  return min + "'" + sec +"''";
	  };
  });
