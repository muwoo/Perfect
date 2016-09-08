var myApp = angular.module("myApp", []);

myApp.controller('dynamicCtrl', function ($scope, $http) {

  //$scope.comment = function (e) {
  //  $http({
  //    method: "POST",
  //    url: "/comment",
  //    data: {'username': _username, 'content': $scope.myDynamic}
  //  }).success(function (data, status) {
  //    if (data.status) {
  //      console.log(data)
  //    }
  //    else {
  //      console.log(ok)
  //    }
  //  }).error(function (data, status) {
  //    $scope.LoginErr = status;
  //  });
  //};

});