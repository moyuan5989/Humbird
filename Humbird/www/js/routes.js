myApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('menu', {
    url: '/menu',
    abstract: true,
    templateUrl: 'templates/menu.html'
    // controller: 'MenuCtrl'
  })

  .state('menu.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('menu.history', {
      url: '/history',
      views: {
        'menuContent': {
          templateUrl: 'templates/history.html'
        }
      }
    })

    .state('menu.payment', {
      url: '/payment',
      views: {
        'menuContent': {
          templateUrl: 'templates/payment.html',
          controller: 'PayCtrl'
          
        }
      }
    })

  .state('menu.wave', {
    url: '/wave',
    views: {
      'menuContent': {
        templateUrl: 'templates/wave.html',
        // controller: 'WaveCtrl'
      }
    }
  })

  .state('menu.wave_detail', {
    url: '/wave_detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/wave_detail.html',
        // controller: 'WaveDetailCtrl'
      }
    }
  })

  .state('menu.setting', {
    url: '/setting',
    views: {
      'menuContent': {
        templateUrl: 'templates/setting.html',
        // controller: 'SetCtrl'
      }
    }
  })

  .state('menu.instant', {
    url: '/instant',
    views: {
      'menuContent': {
        templateUrl: 'templates/instant.html',
        controller: 'InstantCtrl'
      }
    }
  })
  .state('menu.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  // .state('profile', {
  //   url: '/profile',
    
  //       templateUrl: 'templates/profile.html',
  //       controller: 'ProfileCtrl'
      
    
  // })

  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/menu/home');
});