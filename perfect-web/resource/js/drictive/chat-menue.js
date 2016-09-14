/**
 * Created by monkeyWang
 */
angular.module('chat.menu', ['myAppTest']).directive('chatMenu', function () {
  return {
    restrict: 'E',
    templateUrl: '/chat',
    replace: true,
    controller: function ($scope, $element, $attrs, $transclude, server, formatDate) {
      var socket = io.connect();
      $scope.msgList = [];
      var msg = [];
      socket.on(_userid, function (data) {
        $scope.$apply(function(){
          for(var i=0;i<$scope.msgList.length;i++){
            if($scope.msgList[i].data.user.id === data.user.id){
              $scope.msgList[i].msg.push(data.msg) ;
              $scope.msgList[i].lastMsg = data.msg;
              return;
            }
            else {
              msg = [];
            }
          }
          msg.push(data.msg);
          $scope.msgList.push({data:data,msg:msg,lastMsg:data.msg})
        });
        var tag = '<div><p><span>' + data.user.username + '&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
          '<span>' + formatDate.getDate(new Date().getTime()) + '</span></p>' +
          '<p>' + data.msg + '</p></div>'
        $element.find('.chatContent').append(tag);


      })
      $scope.chatWithMe = function (me) {
        $element.find('.chatContent').empty();
        $.each($scope.msgList,function(i,msg){
          if(me.id === msg.data.user.id){
            $.each(msg.msg,function(i,m){
              var msgHTML = '<div><p><span>' + msg.data.user.username + '&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
                '<span>' + formatDate.getDate(new Date().getTime()) + '</span></p>' +
                '<p>' + m + '</p></div>';
              $element.find('.chatContent').append(msgHTML);
            })
          }
        })
        $scope.me = me;
        $element.find('.chatWindow').show();
      };
      $scope.closeChat = function(){
        $element.find('.chatWindow').hide();
      };
      $scope.a = $element.find('a');
      $scope.a.on('click', function (e) {
        e.preventDefault();
      });
      server.post('/getFriendsList', {}, function (err, result) {
        if (!err) {
          $scope.friendsList = result.result;
        }
      })
    }
  };
});