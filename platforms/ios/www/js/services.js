angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory('Locations', function() {
  return {
    getAll: function() {
      locations = localStorage.getItem('__locations')
      locations = locations ? locations : '[]'
      return JSON.parse(locations)
    },
    create: function(position, name) {
      var newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        name: name
      }
      locationArray = JSON.parse(localStorage.getItem('__locations')) || []
      locationArray.push(newLocation)
      localStorage.setItem('__locations', JSON.stringify(locationArray))
      return locationArray
    },
    delete: function() {

    }
  }
});
