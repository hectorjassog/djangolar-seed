'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
		'restangular',
		//'as-sortable',
		//'pascalprecht.translate',
		//'gettext',
		'ngSanitize',
    'ngTouch'
  ])
	.config(function (RestangularProvider) {
		RestangularProvider.setBaseUrl('http://localhost:53215/api/');
	})
	/* ngRoute, should stay here for the yo:route command
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })*/
;
	
