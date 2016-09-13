/**
 * Created by monkeyWang
 */
angular.module('list.menu',[]).directive('listMenu',function(){
  return {
    restrict: 'A',
    templateUrl: '/header',
    controller:function($scope, $element, $attrs, $transclude) {
      var $hideLi = $element.find('.hide-li');
      var $perfectPills =  $element.find('.perfect-pills');
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
    }
  };
})