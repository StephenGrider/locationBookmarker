angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Locations) {
  $scope.locations = Locations.getAll();


  $scope.goToText = function() {
    var resp = ['Lets go!', 'Take me there.', 'Directions'];
    return resp[0] //randomize
  };

  $scope.setBookmark = function(name) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.locations = Locations.create(position, name)
      $scope.$apply()
    })
  }
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {

});
