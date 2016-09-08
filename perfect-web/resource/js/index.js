import {formatDate} from './common/format-time';

var myApp = angular.module('myApp',['myAppTest']);

//首页
myApp.controller('indexCtrl', function ($scope, server) {
  var $hideLi = $('.perfect-nav .hide-li');
  var $perfectPills = $('.perfect-pills');
  var tag = true;
  $hideLi.on('click', function (e) {
    if (tag) {
      $perfectPills.show();
      tag = false;
    }
    else {
      $perfectPills.hide();
      tag = true;
    }
  });
  server.post('/getDynamic', {}, function (err, result) {
    if (!err) {
      $scope.results = result.result;
      $.each($scope.results, function (i, r) {
        r.creationDate = formatDate(r.creationDate);
      })
    }
  })
});

//发表动态

myApp.controller('dynamicCtrl', function ($scope, server) {
  $scope.comment = function (e) {
    server.post("/comment", {
      'username': _username,
      'content': $scope.myDynamic,
      'date': new Date().getTime()
    }, function (err, data) {
      if (!err) {
        server.post('/getDynamic', {}, function (err, result) {
          if (!err) {
            toastr.success('发表成功');
            $scope.results = result.result;
            $.each($scope.results, function (i, r) {
              r.creationDate = formatDate(r.creationDate);
            })
          }
        })
      }
    })
  };

});