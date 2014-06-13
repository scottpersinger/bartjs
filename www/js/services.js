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

.factory('Stations', function($http) {
  var stations;

  return {
    all: function(callback) {
      return load_stations($http, function(items) {
        stations = items;
        callback(stations);
      });
    },

    get: function(abbr) {
      for (var i in stations) {
        if (stations[i].abbr == abbr) {
          return stations[i];
        }
      }
      return null;
    }
  }
})

.factory('Departures', function($http) {
  return function(abbr, callback) {
    return load_departures($http, abbr, callback);
  };
})

.factory('Favorites', function(Stations) {
  return {
    save_favorites: function(faves) {
      localStorage.setItem('favorites', JSON.stringify(faves));
    },

    add_favorite: function(abbr) {
      var station = Stations.get(abbr);
      var faves = this.load_favorites();
      faves.push(station);
      this.save_favorites(faves);
    },

    load_favorites: function() {
      var faves = localStorage.getItem('favorites');
      if (faves == null) {
        faves = [];
      } else {
        faves = JSON.parse(faves);
      }
      return faves;      
    }  
  }
})

.factory('Survey', function() {
  return function() {
  }
})

