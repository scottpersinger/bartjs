angular.module('starter.controllers', ['ionic'])

.controller('StationsCtrl', function($scope, $http, Stations) {
	$scope.stations = Stations.all(function(stations) {
		$scope.stations = [];
		$scope.stations = stations;
	});
})

.controller('StationDetailCtrl', function($scope, $stateParams, $ionicPopup, Stations, Departures) {
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
  	alert("This is a fave: " + abbr);
  }
})

.controller('FavortiesCtrl', function($scope, Friends) {
  $scope.favorites = [{station:"Station1", abbr:"abbr1"}];
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
