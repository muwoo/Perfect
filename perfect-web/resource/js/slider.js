var myApp = angular.module('myApp');
myApp.controller('sliderCtrl',function ($scope) {
  $scope.collapseTo = function(e){
    e.preventDefault();
  }
});

