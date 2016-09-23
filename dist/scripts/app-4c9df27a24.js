!function(){"use strict";angular.module("ngWeatherApp",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ngRoute","toastr","iso-3166-country-codes"])}(),function(){"use strict";function e(e){var a="279b4be6d54c8bf6ea9b12275a567156",t="http://api.openweathermap.org/data/2.5/";return e(t+":path/:subPath?q=:location",{APPID:a,mode:"json",callback:"JSON_CALLBACK",units:"metric",lang:"en"},{queryWeather:{method:"JSONP",params:{path:"weather"},isArray:!1,headers:{"x-api-key":a}},queryForecast:{method:"JSONP",params:{path:"forecast"},isArray:!1,headers:{"x-api-key":a}},queryForecastDaily:{method:"JSONP",params:{path:"forecast",subPath:"daily",cnt:7},isArray:!1,headers:{"x-api-key":a}}})}function a(e){return{get:function(){return e.get("/api/ip")}}}e.$inject=["$resource"],a.$inject=["$http"],angular.module("ngWeatherApp").factory("openWeatherMap",e).factory("ipService",a).value("exampleLocations",["Boston","San Francisco","Coimbatore","Seekonk","Bangalore","New York","Moscow","Mumbai"]).value("stormLocations",["Sylt","St. Peter-Ording","Husum","Bremerhaven","Hamburg","Kiel","Lübeck"])}(),function(){"use strict";angular.module("ngWeatherApp").filter("interpolate",["version",function(e){return function(a){return String(a).replace(/\%VERSION\%/gm,e)}}]).filter("placeholder",[function(){return function(e,a){return angular.isUndefined(e)||""==e?a:e}}])}(),function(){"use strict";angular.module("ngWeatherApp").directive("appVersion",["version",function(e){return function(a,t,n){t.text(e)}}]).directive("weatherPanel",[function(){return{restrict:"EA",scope:{useDayForecast:"=showEntry",forecast:"=weatherPanel"},templateUrl:"app/components/weather/partials/_weather-panel-light.html",link:function(e,a,t){e.getIconImageUrl=function(e){return e?"http://openweathermap.org/img/w/"+e+".png":""},e.parseDate=function(e){return new Date(1e3*e)}}}}]).directive("weatherPanelWind",[function(){return{restrict:"EA",scope:{useDayForecast:"=showEntry",forecast:"=weatherPanel"},templateUrl:"partials/_weather-panel-wind.html",link:function(e,a,t){e.getIconImageUrl=function(e){return e?"http://openweathermap.org/img/w/"+e+".png":""},e.parseDate=function(e){return new Date(1e3*e)}}}}])}(),function(){"use strict";function e(){function e(e){var a=this;a.relativeDate=e(a.creationDate).fromNow()}e.$inject=["moment"];var a={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:e,controllerAs:"vm",bindToController:!0};return a}angular.module("ngWeatherApp").directive("acmeNavbar",e)}(),function(){"use strict";function e(e,a,t,n,r,s,i){var o=this;o.message="",o.hasState="",o.exampleLocations=n,o.stormLocations=r,o.iconBaseUrl="http://openweathermap.org/img/w/",o.forecast=t.queryForecastDaily({location:n[0]}),o.getForecastByLocation=function(){return""==o.location||void 0==o.location?(o.hasState="has-warning",void(o.message="Please provide a location")):(o.hasState="has-success",void(o.forecast=t.queryForecastDaily({location:o.location})))},o.ipAddress=i(),o.setLocation=function(e){o.location=e,o.getForecastByLocation()},o.getIconImageUrl=function(e){return e?o.iconBaseUrl+e+".png":""}}e.$inject=["$timeout","toastr","openWeatherMap","exampleLocations","stormLocations","ISO3166","ipService"],angular.module("ngWeatherApp").controller("MainController",e)}(),function(){"use strict";function e(e){e.debug("runBlock end")}e.$inject=["$log"],angular.module("ngWeatherApp").run(e)}(),function(){"use strict";function e(e){e.when("/",{templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).otherwise({redirectTo:"/"})}e.$inject=["$routeProvider"],angular.module("ngWeatherApp").config(e)}(),function(){"use strict";angular.module("ngWeatherApp").constant("malarkey",malarkey).constant("moment",moment)}(),function(){"use strict";function e(e,a){e.debugEnabled(!0),a.allowHtml=!0,a.timeOut=3e3,a.positionClass="toast-top-right",a.preventDuplicates=!0,a.progressBar=!0}e.$inject=["$logProvider","toastrConfig"],angular.module("ngWeatherApp").config(e)}(),angular.module("ngWeatherApp").run(["$templateCache",function(e){e.put("app/main/main.html",'<div class=container><div><acme-navbar creation-date=main.creationDate></acme-navbar></div><div class=container><div class=weather-search><div class=row><div class=col-xs-12><div><form class=form-inline role=form><span class=btn-group><button ng-repeat="item in main.exampleLocations" ng-click=main.setLocation(item) type=submit class="btn btn-default">{{item}}</button> </span><span class="form-group {{main.hasState}}"><label class=sr-only for=main.location>City</label><input ng-model=main.location type=text class=form-control id=location placeholder=City> </span><button ng-click=main.getForecastByLocation(main.location) type=submit class="btn btn-primary">Search!</button> <span ng-show=main.message class=alert><span class="glyphicon glyphicon-arrow-left">&nbsp;</span>{{main.message}}</span></form></div></div></div></div><div class=weather-data ng-show=true><div class=row><div class=col-xs-12><div><h3>{{main.forecast.city.name |placeholder:\'?\'}}, {{main.forecast.city.country | isoCountry}} <small>Lon: {{main.forecast.city.coord.lon | number:2}} Lat: {{main.forecast.city.coord.lat | number:2}} Population: {{main.forecast.city.population | number:0}}</small></h3></div></div></div><div class=row><div class=col-xs-12><div weather-panel=forecast show-entry=main.forecast.list[0]></div></div></div><div class=row><div class=col-xs-4><div weather-panel=forecast show-entry=main.forecast.list[1]></div></div><div class=col-xs-4><div weather-panel=forecast show-entry=main.forecast.list[2]></div></div><div class=col-xs-4><div weather-panel=forecast show-entry=main.forecast.list[3]></div></div></div></div></div></div>'),e.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class=container-fluid><div class=navbar-header><a class=navbar-brand href=https://github.com/Swiip/generator-gulp-angular><span class="glyphicon glyphicon-home"></span> Scalable Weather App</a></div><div class="collapse navbar-collapse" id=bs-example-navbar-collapse-6><ul class="nav navbar-nav"><li class=active><a ng-href=#>Home</a></li></ul><ul class="nav navbar-nav navbar-right acme-navbar-text"><li>Application was created {{ vm.relativeDate }}.</li><br><li>IP Address: {{ vm.relativeDate }}.</li></ul></div></div></nav>'),e.put("app/components/weather/partials/_weather-panel-light.html","<div class=\"weather panel panel-primary\"><div class=panel-heading>{{parseDate(useDayForecast.dt) | date:'fullDate'}}</div><div class=panel-body><div><p class=lead><img ng-src={{getIconImageUrl(useDayForecast.weather[0].icon)}}> {{useDayForecast.temp.day | number:1}}&#176;C {{useDayForecast.weather[0].main}}</p><p>{{useDayForecast.weather[0].description}}&nbsp;&#126;&nbsp; High: {{useDayForecast.temp.max}}&#176;C&nbsp;&#126;&nbsp; Low: {{useDayForecast.temp.min}}&#176;C</p></div></div><div class=panel-footer><small>Day: {{useDayForecast.temp.day}}&#176;C&nbsp;&#126;&nbsp; Night: {{useDayForecast.temp.night}}&#176;C&nbsp;&#126;&nbsp; Pressure: {{useDayForecast.pressure}} hPa&nbsp;&#126;&nbsp; Humidity: {{useDayForecast.humidity}}%</small></div></div>"),e.put("app/components/weather/partials/_weather-panel-wind.html","<div class=\"weather panel panel-primary\"><div class=panel-heading>{{parseDate(useDayForecast.dt) | date:'fullDate'}}</div><div class=panel-body><div><p class=lead><img ng-src={{getIconImageUrl(useDayForecast.weather[0].icon)}}> Speed: {{ (useDayForecast.speed * 3.6).toFixed(2) }} km/h ({{useDayForecast.speed}} m/s)<br>Pressure: {{useDayForecast.pressure}} hPa</p><p>{{useDayForecast.temp.day | number:1}}&#176;C {{useDayForecast.weather[0].main}}&nbsp;&#126;&nbsp; {{useDayForecast.weather[0].description}}&nbsp;&#126;&nbsp; High: {{useDayForecast.temp.max}}&#176;C&nbsp;&#126;&nbsp; Low: {{useDayForecast.temp.min}}&#176;C</p></div></div><div class=panel-footer><small>Day: {{useDayForecast.temp.day}}&#176;C&nbsp;&#126;&nbsp; Night: {{useDayForecast.temp.night}}&#176;C&nbsp;&#126;&nbsp; Pressure: {{useDayForecast.pressure}} hPa&nbsp;&#126;&nbsp; Humidity: {{useDayForecast.humidity}}%</small></div></div>")}]);
//# sourceMappingURL=../maps/scripts/app-4c9df27a24.js.map
