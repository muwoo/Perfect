/**
 * @file 
 * @author tang
 */


var myApp = angular.module("myApp", []);
myApp.controller('registerCtrl', function($scope,$http) {
  $scope.firstName = '';
  $scope.RegisterErr = '123123';
  $scope.show = false;
  $scope.register = function(e){
    $http({
      method: "POST",
      url: "/ajaxRegister",
      data:{
        'username':$scope._username,
        'email':$scope._email,
        'password':$scope._password
      }
    }).
    success(function(data, status) {
      if(data.status){
        $scope.show = true;
        $scope.RegisterErr = "用户名或密码错误";
      }
      else {
        window.location.href = '/register';
      }
    }).
    error(function(data, status) {
      $scope.RegisterErr = status;
    });
    // return false;
  };

});
