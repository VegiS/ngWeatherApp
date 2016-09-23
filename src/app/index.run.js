(function() {
  'use strict';

  angular
    .module('ngWeatherApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
