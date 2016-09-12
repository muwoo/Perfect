var myAppTest = angular.module("myAppTest", ['ui.router', 'ui.jq']);
myAppTest.constant('JQ_CONFIG', {//合并库
    easyPieChart: ['bower_components/jquery.easy-pie-chart/dist/jquery.easy-pie-chart.js'],
    sparkline: ['bower_components/jquery-sparkline/dist/jquery.sparkline.min.js'],
    plot: ['bower_components/Flot/jquery.flot.js',
      'bower_components/Flot/jquery.flot.resize.js',
      'bower_components/flot-spline/js/jquery.flot.spline.js',
      'public/js/compressed/thirty-part/jquery.flot.tooltip.min.js',
      'public/js/compressed/thirty-part/jquery.flot.orderBars.js',
      'public/js/compressed/thirty-part/jquery.flot.pie.min.js'
    ]
  }).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/page');
    $stateProvider.state('page', {
        url: '/page',
        templateUrl: '/page',
        controller: 'indexCtrl'
      })
      .state('charts', {
        url: '/charts',
        resolve: {  //预加载数据，解决第二点击时不会请求templateUrl,导致加载不了的问题
          dynamic: function ($http) {
            return $http({
              method: 'POST',
              url: '/getDynamic'
            });
          }
        },
        templateUrl: '/charts' + '?datestamp=' + (new Date()).getTime(),
        controller: 'chartsCtrl'
      });
  }]);

//服务

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
myAppTest.service('formatDate', function () {
  this.getDate = function (strTime) {
    var date = new Date(strTime);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + sec;
  }
})
