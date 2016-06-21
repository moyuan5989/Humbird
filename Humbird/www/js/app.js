// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var myApp = angular.module('myApp', ['ionic', 'firebase', 'ngCordova']);

myApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.directive('ionSideMenuContentScale', function($timeout,$rootScope,$ionicModal) {
  return {
    restrict: 'AC',
    link: function(scope, element, attrs) {
      scope.$watch(function() {
        return element.attr('style');
      }, function(newValue){
        if(typeof newValue != "undefined"){
          var transform = newValue.replace("transform: translate3d","");
          transform = transform.replace(/[^\w\s]/gi, '');
          transform = transform.replace(/px/gi, '');
          var axis = transform.split(" ");
          if(typeof axis[0] != "undefined" && parseInt(axis[0]) != 0){
            element.addClass('side-menu-open');
          }else{
            element.removeClass('side-menu-open');
          }

        }

      });
    }
  }
});


