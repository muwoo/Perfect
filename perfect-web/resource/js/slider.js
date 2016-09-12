var myApp = angular.module('myApp');
myApp.controller('sliderCtrl',function ($scope) {

  $scope.collapseTo = function(e){
    e.preventDefault();
  };

  var href = location.hash;
  switch (href){
    case '#/page' :
      $('#collapseOne').addClass('in');
      $('#collapseTwo').removeClass('in');
      break;
    case '#/charts':
      $('#collapseOne').removeClass('in');
      $('#collapseTwo').addClass('in');
      break;
  }
});

