var bartAPIKey = 'EMLB-U85T-QESY-9HKA';
var bartResult;

function load_departures($http, station, callback) {
	var url = 'http://api.bart.gov/api/etd.aspx'
    	, bart = [];

  //url = '/etd.aspx.xml?orig=' + station;
    //Request Departures
  $http({
    url: url,
    method: 'GET',
    params: {
      cmd: 'etd',
      orig: station,
      key: bartAPIKey
    },
    transformResponse:function(result){
      //Page title
      var departures = [];

      $(result).find('etd').each(function(i, data){
        //Process directions
        var dest = $(data).find('destination').text();
        $(data).find('estimate').each(function(i, estimate) {
          var mins = parseInt($(estimate).find('minutes').text());
          if (mins) {
            departures.push({
              dest: dest,
              minutes: mins,
              cars: parseInt($(estimate).find('length').text())
            });
          } else {
            console.log(estimate);
          }
        });
      });

      departures = departures.sort(function(d1, d2) {
        return d1.minutes - d2.minutes;
      });
      // Roll up departures to the same station into one record
      var newList = [];
      var stationDep = {};
      departures.forEach(function(d) {
        if (stationDep[d.dest]) {
          stationDep[d.dest].minutes.push(d.minutes);
        } else {
          stationDep[d.dest] = d;
          d.minutes = [d.minutes];
          newList.push(d);
        }
      });
      departures = newList;

      return departures;      
  	}
  }).success(function(result, status, headers, config){
      localStorage.setItem(station, result);
      result.forEach(function(dep) {
        dep.times = dep.minutes.join(", ");
      })
      callback(result);
  });
  return localStorage.getItem(station);
}

function load_stations($http, callback) {
	var url = 'http://api.bart.gov/api/stn.aspx'
    	, stations = [];

  //url = '/stn.aspx.xml';
  //Request station list
  $http({
    url: url,
    method:'GET',
    params: {
      cmd: 'stns',
      key: bartAPIKey
    },
    transformResponse:function(result) {
      // convert the data to JSON and provide
      // it to the success function below
      bartResult = result;
      $(result).find('station').each(function(i, data) {
        stations.push({name: $(data).find('name').text(), abbr: $(data).find('abbr').text()});
      });
      return stations;
    }
	}).success(function(result, status, headers, config){
      localStorage.setItem('_stations_', result);
      callback(result);
	});
  return localStorage.getItem('_stations_');
}
