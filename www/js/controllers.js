angular.module('starter.controllers', ['ionic'])

.controller('StationsCtrl', function($scope, $http, Stations) {
	$scope.stations = Stations.all(function(stations) {
		$scope.stations = [];
		$scope.stations = stations;
	});
})

.controller('StationDetailCtrl', function($scope, $stateParams, $ionicPopup, Stations, Departures, Favorites) {
  $scope.station = Stations.get($stateParams.abbr);
  $scope.departures = Departures($stateParams.abbr, function(departures) {
  	$scope.departures = departures;
  });

  $scope.showDetails = function(dep) {
  	$ionicPopup.alert({
      title: dep.dest,
      content: "Leaving in " + dep.minutes + " minutes" + "<br />" + dep.cars + " car train"
    });
  }

  $scope.favorite = function(abbr) {
    Favorites.add_favorite(abbr);
  }
})

.controller('FavoritesCtrl', function($scope, Friends, Favorites) {
  $scope.favorites = Favorites.load_favorites();
  $scope.showDelete = false;

  $scope.toggleEdit = function() {
    $scope.showDelete = !$scope.showDelete;
  }

  $scope.unfavorite = function(abbr) {
    for (var i = $scope.favorites.length; i--; ) {
      if ($scope.favorites[i].abbr == abbr) {
        $scope.favorites.splice(i, 1);
        Favorites.save_favorites($scope.favorites);
        return;
      }
    }
  }

})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope, $state, Survey) {
  $scope.start = function() {
    Survey();
    $state.go('tab.account-q1');
  }
});
