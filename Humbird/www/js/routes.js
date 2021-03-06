myApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('menu', {
    url: '/menu',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  })

  .state('welcome', {
    url: '/welcome',
    templateUrl: 'templates/welcome.html',
    controller: 'WelcomeCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    resolve: {
  // controller will not be loaded until $waitForAuth resolves
  // Auth refers to our $firebaseAuth wrapper in the example above
  "currentAuth": ["Auth",
  function (Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$waitForAuth();
      }]
    }
  })

  .state('forgetPwd', {
    url: '/forgetPwd',
    templateUrl: 'templates/forgetPwd.html',
    controller: 'forgetPwdCtrl'
  })

  .state('menu.waveDetail', {
    url: '/waveDetail',
    views: {
      'menuContent': {
        templateUrl: 'templates/wave_detail.html',
        controller: 'WaveDetailCtrl'
      }
    }
  })

  .state('waiting', {
    url: '/waiting',
    templateUrl: 'templates/waiting.html',
    controller: 'WaitCtrl'
  })

   .state('holding', {
    url: '/holding',
    templateUrl: 'templates/holding.html'
    // controller: 'HoldCtrl'
  })

   .state('menu.info', {
    url: '/info',
    views: {
      'menuContent': {
        templateUrl: 'templates/info.html',
        controller: 'InfoCtrl'
      }
    }
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
        templateUrl: 'templates/history.html',
        controller: 'HistoryCtrl'
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
        controller: 'WaveCtrl'
      }
    }
  })

  .state('menu.wave_detail', {
    url: '/wave_detail',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/wave_detail.html',
        controller: 'WaveDetailCtrl'
      }
    }
  })

  .state('menu.history_detail', {
    url: '/history_detail',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/history_detail.html',
        controller: 'HistoryDetailCtrl'
      }
    }
  })

  .state('menu.setting', {
    url: '/setting',
    views: {
      'menuContent': {
        templateUrl: 'templates/setting.html',
         controller: 'SetCtrl'
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
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/welcome');
});
