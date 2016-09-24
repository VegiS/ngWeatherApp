(function() {
  'use strict';

  angular
    .module('ngWeatherApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($http,$timeout, toastr,openWeatherMap,exampleLocations,ISO3166,ipService) {
    var vm = this;

    vm.message = '';
    vm.hasState = '';

    // Expose example locations to vm
    vm.exampleLocations = exampleLocations;
    //vm.stormLocations = stormLocations;
    vm.iconBaseUrl = 'http://openweathermap.org/img/w/';

    // On initialization load data for first example entry
    vm.forecast = openWeatherMap.queryForecastDaily({
      location: exampleLocations[ 0 ]
    });

    // Get forecast data for location as given in vm.location
    vm.getForecastByLocation = function() {

      if (vm.location == '' || vm.location == undefined) {
        vm.hasState = 'has-warning';
        vm.message = 'Please provide a location';
        return;
      }

      vm.hasState = 'has-success';

      vm.forecast = openWeatherMap.queryForecastDaily({
        location: vm.location
      });
    };
      
  // ipService.get().then(function (data){
  //        vm.ipAddress = data.ipAddress;
  //    });


    // Set vm.location and execute search on API
    vm.setLocation = function(loc) {
      vm.location = loc;
      vm.getForecastByLocation();
    };

    // Get icon image url
    vm.getIconImageUrl = function(iconName) {
      return (iconName ? vm.iconBaseUrl + iconName + '.png' : '');
    };
  }
})();
