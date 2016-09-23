(function() {
  'use strict';

  angular
    .module('ngWeatherApp')

    /** @ngInject */
      //
  // Simple directive just setting version as elements value (kept from angular-seed dist)
  //
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  /** @ngInject */
  //
  // Create directive that handles formatting, resource fetching and
  // output of weather data for a specific date
  //
  .directive('weatherPanel',[function factory() {
    return {
      restrict: 'EA',

      scope: {
        useDayForecast: '=showEntry',
        forecast: '=weatherPanel'
      },

      templateUrl: 'app/components/weather/partials/_weather-panel-light.html',

      link: function(scope, element, attrs) {
        // Get icon image url
        scope.getIconImageUrl = function(iconName) {
          return (iconName ? 'http://openweathermap.org/img/w/' + iconName + '.png' : '');
        };

        scope.parseDate = function (time) {
          return new Date(time * 1000);
        };
      }
    }
  }])

/** @ngInject */
//
// "Wind" edition
//
.directive('weatherPanelWind',[function factory() {
  return {
    restrict: 'EA',

    scope: {
      useDayForecast: '=showEntry',
      forecast: '=weatherPanel'
    },

    templateUrl: 'partials/_weather-panel-wind.html',

    link: function(scope, element, attrs) {
      // Get icon image url
      scope.getIconImageUrl = function(iconName) {
        return (iconName ? 'http://openweathermap.org/img/w/' + iconName + '.png' : '');
      };

      scope.parseDate = function (time) {
        return new Date(time * 1000);
      };
    }
  }
}]);
 
})();
