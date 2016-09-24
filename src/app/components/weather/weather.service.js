(function() {
  'use strict';

  angular
    .module('ngWeatherApp')
    .factory('openWeatherMap', openWeatherMap)
    .factory('ipService',ipService)

     //
  // Define a standard list of "example locations"
  //
  /** @ngInject */
  .value('exampleLocations',['Boston','San Francisco','Coimbatore','Seekonk','Bangalore','New York','Moscow','Mumbai'])

    /** @ngInject */
    function openWeatherMap($resource)
    {

    // API key is currently unused (work either with or without key)
    var apiKey = 'f4121c5e9105e23ecff0cdc7a0e3eede';
    var apiBaseUrl = 'http://api.openweathermap.org/data/2.5/';

    
    return $resource(apiBaseUrl + ':path/:subPath?q=:location',
      {
        APPID: apiKey,
        mode: 'json',
        callback: 'JSON_CALLBACK',
        units: 'metric',
        lang: 'en'
      },
      {
        queryWeather: {
          method: 'JSONP',
          params: {
            path: 'weather'
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        },
        queryForecast: {
          method: 'JSONP',
          params: {
            path: 'forecast'
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        },
        queryForecastDaily: {
          method: 'JSONP',
          params: {
            path: 'forecast',
            subPath: 'daily',
            cnt: 7
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        }
      }
    )
  }

  function ipService($http)
  {
      return {
        // call to get all nerds
        get : function() {
             $http.get('/api/ip')
                  .then (function (response){
                    return response;
                  });
        }
    }       
  }

})();
