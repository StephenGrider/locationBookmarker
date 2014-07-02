angular.module('starter.controllers', [])

.controller('IntroCtrl', function($scope, Locations) {

})

.controller('NavCtrl', function($scope, $rootScope){
  $scope.settingsClick = function() {
    $rootScope.$emit('navbar:settings:click');
  }
})

.controller('DashCtrl', function($scope, Locations, $q, $timeout, $rootScope) {
  $('.nav-bar').show()
  $scope.locations = Locations.getAll();

  $rootScope.$on('navbar:settings:click', function() {
    $scope.edit = !$scope.edit;
  })

  $scope.deleteLocation = function(index, event) {
    event.stopPropagation();
    Locations.deleteByIndex(index);
    $scope.locations = Locations.getAll();
  }

  $scope.getDistances = function(){
    $scope.haveDistances = false;
    var promise = Locations.getAllWithDistances();
    promise.then(function(locs){
      $timeout(function(){
        $scope.locations = locs;
        $scope.haveDistances = true;
        $scope.$apply();
        $scope.$broadcast('scroll.refreshComplete');
      }.bind(this),2500);
    })
  };
  $timeout(function(){$scope.$apply}.bind(this));
  $scope.getDistances();

  $('.navbar-settings').show(); //yolo

  $scope.goToText = function() {
    var resp = ['Lets go!', 'Take me there.', 'Directions'];
    return resp[0]
  };
})

.controller('BookmarkCtrl', function($scope, Locations) {
  $('.navbar-settings').hide();
  $scope.settingBookmark = true;

  $scope.setBookmark = function(name) {
    navigator.geolocation.getCurrentPosition(function(position) {
      debugger
      $scope.settingBookmark = false;
      $('.bookmark-complete').animate({'font-size': '50px'}, 200);
      $scope.locations = Locations.create(position, name);
    })
  }
});
