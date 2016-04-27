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
                    	  RestangularProvider.setBaseUrl('http://192.168.1.30:53215/api/');
                	      RestangularProvider.setRequestSuffix('/');
                      })
                      .config(function ($stateProvider, $urlRouterProvider) {
                    	  //Configuring the state. Putting the adress of the template and association with the controller
                    	  $stateProvider
                    	  //Declaration of the parameters when the url access to the defined state
                    	  //.state <=> when in $routeProvider's declaration
                    	  //Don't forget the '<div ui-view></div>' in your html
                    	  .state('main', {
                    		  //url to get to this state
                    		  url: '/',
                    		  //Path to the html partial (or view)
                    		  templateUrl: 'views/main.html',
                    		  //Controller instantiated in the scope of the partial
                    		  controller: 'MainCtrl',
                    		  //Alias for the controller in the scope
                    		  controllerAs: 'main'
                    	  })
                    	  .state('about', {
                    		  url: '/about/',
                    		  templateUrl: 'views/about.html',
                    		  controller: 'AboutCtrl',
                    		  controllerAs: 'about'
                    	  })
                    	  .state('detail', {
                    		  url: '/detail/:albumId',
                    		  templateUrl: 'views/detail.html',
                    		  controller: 'DetailCtrl',
                    		  controllerAs: 'detail'
                    	  })
                    	  .state('ajoutAlbum', {
                    		  url: '/ajoutAlbum',
                    		  templateUrl: 'views/ajoutAlbum.html',
                    		  controller: 'AjoutalbumCtrl',
                    		  controllerAs: 'ajoutAlbum'
                    	  })
                    	  ;
                    	  $urlRouterProvider.otherwise('/');
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
      .when('/detail', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl',
        controllerAs: 'detail'
      })
      .when('/ajoutAlbum', {
        templateUrl: 'views/ajoutalbum.html',
        controller: 'AjoutalbumCtrl',
        controllerAs: 'ajoutAlbum'
      })
      .otherwise({
        redirectTo: '/'
      });
  })*/
                      ;
