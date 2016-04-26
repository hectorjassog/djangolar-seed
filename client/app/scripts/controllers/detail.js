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
	  
	  //Returns an object in the "xx min xx s" format
	  var alterDuration = function(duration) {
		  var min = Math.floor(duration / 60);
		  console.log(min);
		  var sec = Math.floor(duration % 60);
		  console.log(sec);
		  return min + "'" + sec +"''";
	  };
  });
