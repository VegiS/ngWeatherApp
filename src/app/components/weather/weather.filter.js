(function() {
  'use strict';

  angular
    .module('ngWeatherApp')

    /** @ngInject */
     .filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }])
   
   /** @ngInject */
  .filter('placeholder', [function() {
    return function (input,phvalue) {
      return (angular.isUndefined(input) || input == '') ? phvalue : input;
    };
  }])

 
})();
