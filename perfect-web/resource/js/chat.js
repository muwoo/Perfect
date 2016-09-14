/**
 * Created by monkeyWang.
 */
var myApp = angular.module('myApp');
myApp.controller('chatCtrl', function ($scope, formatDate) {
  var socket = io.connect();

  $scope.sendMsg = function (id) {
    //与服务器进行连接
    socket.emit('foo', {id: id, msg: $scope.message, user: {id: _userid, username: _username, discribe: _discribe}});
    var tag = '<div><p><span>' + _username + '&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
      '<span>' + formatDate.getDate(new Date().getTime()) + '</span></p>' +
      '<p>' + $scope.message + '</p></div>'
    $('.chatContent').append(tag)
    $scope.message = '';
  }

});
