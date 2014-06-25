angular.module('starter.controllers', [])

.controller('NavCtrl', function($scope){
  $scope.settingsClick = function() {
    $rootScope.$emit('navbar:settings:click'); 
  }
})

.controller('DashCtrl', function($scope, Locations, $q, $timeout) {
  $scope.locations = Locations.getAll();

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

  $scope.goToText = function() {
    var resp = ['Lets go!', 'Take me there.', 'Directions'];
    return resp[0] //randomize
  };

  $('.navbar-settings').show()

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
