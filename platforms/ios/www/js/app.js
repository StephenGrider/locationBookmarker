angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $state, Locations) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }


    var tutorialComplete = JSON.parse(localStorage.getItem('__locations:tutorialComplete'));
    if(!tutorialComplete) {
      var sf = {
        coords: {
          longitude: 74.0059,
          latitude: 40.7127
        }
      }

      var ny = {
        coords: {
          longitude: 122.4167,
          latitude: 37.7833
        }
      }

      Locations.create(sf, 'San Francisco')
      Locations.create(ny, 'New York')
      localStorage.setItem('__locations:tutorialComplete', 'true')
      $state.go('intro')
      $('.nav-bar').hide()
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('intro', {
      url: '/intro',
      templateUrl: 'templates/slide-tutorial.html',
      controller: 'IntroCtrl'
    })


    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.bookmark', {
      url: '/bookmark',
      views: {
        'tab-bookmark': {
          templateUrl: 'templates/tab-bookmark.html',
          controller: 'BookmarkCtrl'
        }
      }
    })

  $urlRouterProvider.otherwise('/tab/dash');

})

.config(['$compileProvider', function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel|geo|maps):/);
}]);
