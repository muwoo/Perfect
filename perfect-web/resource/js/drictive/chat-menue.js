/**
 * Created by monkeyWang
 */
angular.module('chat.menu', ['myAppTest']).factory('msgList', function () {
    return {msgList: []};
  })
  .directive('chatMenu', function () {
    return {
      restrict: 'E',
      templateUrl: '/chat',
      replace: true,
      controller: function ($scope, $element, $attrs, $transclude, server, formatDate, msgList) {
        function msgHtml(data) {
          return '<div><p><span>' + data.user.username + '&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
            '<span>' + formatDate.getDate(data.time) + '</span></p>' +
            '<p>' + data.msg + '</p></div>';
        }

        var socket = io.connect();//初始化socket
        $scope.msgList = [];//定义消息
        var msg = [];
        socket.on(_userid, function (data) {//监听消息
          $scope.$apply(function () {//$apply 立刻更新消息列表
            for (var i = 0; i < $scope.msgList.length; i++) {
              if ($scope.msgList[i].data.user[0].id === data.user.id) {
                $scope.msgList[i].msg.push({content: data.msg, name: data.user.username, time: data.time});
                $scope.msgList[i].lastMsg = {content: data.msg, name: data.user.username, time: data.time};
                msgList.msgList = $scope.msgList;
                return;
              }
            }
            $scope.msgList.push({
              data: {user: [data.user]},
              msg: [{content: data.msg, name: data.user.username, time: data.time}],
              lastMsg: {content: data.msg, name: data.user.username, time: data.time}
            });
            msgList.msgList = $scope.msgList;
          });
          var tag = msgHtml(data);
          $element.find('.chatContent').append(tag);

        })
        $scope.sendMsg = function (me) {
          socket.emit('foo', {
            id: me.id,
            time: new Date().getTime(),
            msg: $scope.message,
            user: {id: _userid, username: _username, discribe: _discribe}
          });
          var tag = msgHtml({user:{username:_username},time:new Date().getTime(),msg:$scope.message});
          $('.chatContent').append(tag);
          //与服务器进行连接
          server.post('/updateChatMsg', {
            content: {time: new Date().getTime(), content: $scope.message, name: _username},
            user: me
          }, function () {});
          for (var i = 0; i < $scope.msgList.length; i++) {
            if ($scope.msgList[i].data.user[0].id === me.id) {
              $scope.msgList[i].msg.push({content: $scope.message, name: _username, time: new Date().getTime()});
              $scope.msgList[i].lastMsg = {content: $scope.message, name: _username, time: new Date().getTime()};
              $scope.message = '';
              return;
            }
          }
          $scope.msgList.push({
            data: {user: [{id: _userid, username: _username, discribe: _discribe}]},
            msg: [{content: $scope.message, name: _username, time: new Date().getTime()}],
            lastMsg: {content: $scope.message, name: _username, time: new Date().getTime()}
          });
          $scope.message = '';
        };
        $scope.chatWithMe = function (me) {
          $element.find('.chatContent').empty();
          $.each($scope.msgList, function (i, msg) {
            if (me.id === msg.data.user[0].id) {
              $.each(msg.msg, function (i, m) {
                var msgHTML = msgHtml({user:{username:m.name},time:m.time,msg:m.content})
                $element.find('.chatContent').append(msgHTML);
              })
            }
          })
          $scope.me = me;
          $element.find('.chatWindow').show();
        };
        $scope.closeChat = function () {
          $element.find('.chatWindow').hide();
        };
        $scope.a = $element.find('a');
        $scope.a.on('click', function (e) {
          e.preventDefault();
        });
        server.post('/getFriendsList', {}, function (err, result) {
          if (!err) {
            $scope.friendsList = result.result;
            for (var i = 0; i < $scope.friendsList.length; i++) {
              if ($scope.friendsList[i].chat !== null) {
                var msg = JSON.parse($scope.friendsList[i].chat);
                var lastMsg = msg[msg.length - 1];
                $scope.msgList.push({data: {user: $scope.friendsList[i].friend}, msg: msg, lastMsg: lastMsg})
              }

            }
            msgList.msgList = $scope.msgList;
          }

        })
      }
    };
  });