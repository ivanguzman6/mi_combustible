// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('mi_consumo', ['ionic', 'mi_consumo.controllers', 'mi_consumo.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})
	  

.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider
	
	.state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "template/menu.html",
      controller: 'registro_consumoCtrl'
    })
	
	.state('app.registro_consumo', {
      url: "/registro_consumo",
      views: {
        'menuContent' :{
          templateUrl: "template/registro_consumo.html",
          controller: 'registro_consumoCtrl'
        }
      }
	 }) 
	 
	.state('app.historial_consumo', {
      url: "/historial_consumo",
      views: {
        'menuContent' :{
          templateUrl: "template/historial_consumo.html",
          controller: 'registro_consumoCtrl'
        }
     }
	})
	/* .state ('registro_consumo', {
		url:"/registro_consumo" ,
		templateUrl:'template/registro_consumo.html', 
		controller:'registro_consumoCtrl'
	});
		*/
	

	
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/registro_consumo');
  
  
});

