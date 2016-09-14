var myApp = angular.module('myApp',['myAppTest']);

//首页
myApp.controller('indexCtrl', function ($scope, server,formatDate) {
  server.post('/getDynamic', {}, function (err, result) {
    if (!err) {
      $scope.results = result.result;
      $.each($scope.results, function (i, r) {
        r.creationDate = formatDate.getDate(r.creationDate);
      })
    }
  })
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
              r.creationDate = formatDate.getDate(r.creationDate);
            })
          }
        })
      }
    })
  };
});


