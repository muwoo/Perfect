var myAppTest = angular.module("myAppTest", ['ui.router','ui.jq']);
myAppTest.constant( 'JQ_CONFIG', {
    easyPieChart:   ['bower_components/jquery.easy-pie-chart/dist/jquery.easy-pie-chart.js'],
    sparkline:      ['bower_components/jquery-sparkline/dist/jquery.sparkline.min.js'],
    plot:           ['bower_components/Flot/jquery.flot.js',
                     'bower_components/Flot/jquery.flot.resize.js',
                     'bower_components/flot-spline/js/jquery.flot.spline.js',
                     'public/js/compressed/thirty-part/jquery.flot.tooltip.min.js',
                     'public/js/compressed/thirty-part/jquery.flot.orderBars.js',
                     'public/js/compressed/thirty-part/jquery.flot.pie.min.js'
                    ]
  }
  )
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/page');
  $stateProvider.state('page', {
      url: '/page',
      templateUrl: '/page',
      controller: 'indexCtrl'
    })
    .state('charts', {
      url: '/charts',
      templateUrl: '/charts',
      controller: 'chartsCtrl'
    });
}]);

myAppTest.service('server', function ($http) {
  this.ajax = function (type, url, data, callback) {
    $http({
      method: type,
      url: url,
      data: data
    }).success(function (data, status) {
      if (data.status) {
        callback(data);
      }
      else {
        callback(null, data);
      }
    }).error(function (data, status) {
      callback(status);
    });
  };
  this.post = function (url, data, callback) {
    this.ajax('post', url, data, callback);
  };
  this.get = function (url, data, callback) {
    this.ajax('get', url, data, callback);
  }
});
