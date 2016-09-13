/**
 * Created by monkeyWang
 */
angular.module('chat.menu',['myAppTest']).directive('chatMenu',function(){
  return {
    restrict: 'E',
    templateUrl: '/chat',
    replace:true,
    controller:function($scope, $element, $attrs, $transclude,server) {
      $scope.a = $element.find('a');
      $scope.a.on('click',function(e){
        e.preventDefault();
      });
      server.post('/getFriendsList',{},function(err, result){
        if(!err){
          $scope.friendsList = result.result;
        }
      })
    }
  };
})