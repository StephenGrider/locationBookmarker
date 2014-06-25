angular.module('starter.controllers', [])

.controller('NavCtrl', function($scope, $rootScope){
  $scope.settingsClick = function() {
    $rootScope.$emit('navbar:settings:click');
  }
})

.controller('DashCtrl', function($scope, Locations, $q, $timeout, $rootScope) {
  $scope.locations = Locations.getAll();


  $rootScope.$on('navbar:settings:click', function() {
    $scope.edit = !$scope.edit;
  })

  $scope.deleteLocation = function(index) {
    Locations.deleteByIndex(index)
    $scope.locations = Locations.getAll()
  }

  $scope.getDistances = function(){
    $scope.haveDistances = false;
    var promise = Locations.getAllWithDistances()
    promise.then(function(locs){
      $timeout(function(){
        $scope.locations = locs;
        $scope.haveDistances = true
        $scope.$apply();
        $scope.$broadcast('scroll.refreshComplete');
      }.bind(this),2500);
    })
  };
  $timeout(function(){$scope.$apply}.bind(this))
  $scope.getDistances();

  $('.navbar-settings').show() //yolo

  $scope.goToText = function() {
    var resp = ['Lets go!', 'Take me there.', 'Directions'];
    return resp[0] //randomize
  };

  $scope.showRemove = function() {
    console.log('hi')
  }

})

.controller('FriendsCtrl', function($scope, Locations) {
  $('.navbar-settings').hide()
  $scope.setBookmark = function(name) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.locations = Locations.create(position, name)
      $scope.$apply()
    })
  }
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {

});
