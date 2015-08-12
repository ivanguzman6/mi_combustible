// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'MiApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('MiApp', ['ionic'])

	.run(function($ionicPlatform) {
	  $ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins.Keyboard) {
		  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
		  StatusBar.styleDefault();
		}
	  });
	  
	  
	.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	.state ('registro_consumo', {
		url:"/registro_consumo" ,
		templateUrl:'paginas/registro_consumo.html', 
		controller:'registro_consumoCtrl'
	})

	
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('registro_consumo');
  
  
});

