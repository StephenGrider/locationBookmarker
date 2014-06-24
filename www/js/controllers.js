angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Locations, $q) {
  $scope.locations = Locations.getAll();

  $scope.getDistances = function(){
    $scope.haveDistances = false;
    $scope.$apply();
    var promise = Locations.getAllWithDistances()
    promise.then(function(locs){
        $scope.locations = locs;
        $scope.haveDistances = true
        $scope.$apply();
        $scope.$broadcast('scroll.refreshComplete');
      })
  };
  $scope.getDistances();

  $scope.goToText = function() {
    var resp = ['Lets go!', 'Take me there.', 'Directions'];
    return resp[0] //randomize
  };

})

.controller('FriendsCtrl', function($scope, Locations) {
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
