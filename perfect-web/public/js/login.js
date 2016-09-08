(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"D:\\perfectWeb\\Perfect\\perfect-web\\public\\js\\compressed\\login.js":[function(require,module,exports){
'use strict';

//import {Service} from './common/service'
//import {mainApp} from './common/angular-jq'
//var $loginContainer = $('.container-login');
//var $username = $('.username',$loginContainer);
//var $password = $('.password',$loginContainer);
//var service = new Service();
//
//$loginContainer.on('click','.login-btn',function(e){
//  e.preventDefault();
//  service.ajaxPost('/ajaxLogin',{username:$username.val(),password:$password.val()},function(err,result){
//    if(!err){
//      window.location.href = '/';
//    }
//    else{
//
//      $('.err-msg').css('visibility','visible');
//      $('.err-msg').text(err.msg);
//    }
//  })
//});
var myApp = angular.module("myApp", []);
myApp.controller('loginCtrl', function ($scope, $http) {
  $scope.firstName = '';
  $scope.LoginErr = '123123';
  $scope.show = false;
  $scope.login = function (e) {
    $http({
      method: "POST",
      url: "/ajaxLogin",
      data: { 'username': $scope._username, 'password': $scope._password }
    }).success(function (data, status) {
      if (data.status) {
        $scope.show = true;
        $scope.LoginErr = "用户名或密码错误";
      } else {
        window.location.href = '/';
      }
    }).error(function (data, status) {
      $scope.LoginErr = status;
    });
  };
});
},{}]},{},["D:\\perfectWeb\\Perfect\\perfect-web\\public\\js\\compressed\\login.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvY29tcHJlc3NlZC9sb2dpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vL2ltcG9ydCB7U2VydmljZX0gZnJvbSAnLi9jb21tb24vc2VydmljZSdcbi8vaW1wb3J0IHttYWluQXBwfSBmcm9tICcuL2NvbW1vbi9hbmd1bGFyLWpxJ1xuLy92YXIgJGxvZ2luQ29udGFpbmVyID0gJCgnLmNvbnRhaW5lci1sb2dpbicpO1xuLy92YXIgJHVzZXJuYW1lID0gJCgnLnVzZXJuYW1lJywkbG9naW5Db250YWluZXIpO1xuLy92YXIgJHBhc3N3b3JkID0gJCgnLnBhc3N3b3JkJywkbG9naW5Db250YWluZXIpO1xuLy92YXIgc2VydmljZSA9IG5ldyBTZXJ2aWNlKCk7XG4vL1xuLy8kbG9naW5Db250YWluZXIub24oJ2NsaWNrJywnLmxvZ2luLWJ0bicsZnVuY3Rpb24oZSl7XG4vLyAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuLy8gIHNlcnZpY2UuYWpheFBvc3QoJy9hamF4TG9naW4nLHt1c2VybmFtZTokdXNlcm5hbWUudmFsKCkscGFzc3dvcmQ6JHBhc3N3b3JkLnZhbCgpfSxmdW5jdGlvbihlcnIscmVzdWx0KXtcbi8vICAgIGlmKCFlcnIpe1xuLy8gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvJztcbi8vICAgIH1cbi8vICAgIGVsc2V7XG4vL1xuLy8gICAgICAkKCcuZXJyLW1zZycpLmNzcygndmlzaWJpbGl0eScsJ3Zpc2libGUnKTtcbi8vICAgICAgJCgnLmVyci1tc2cnKS50ZXh0KGVyci5tc2cpO1xuLy8gICAgfVxuLy8gIH0pXG4vL30pO1xudmFyIG15QXBwID0gYW5ndWxhci5tb2R1bGUoXCJteUFwcFwiLCBbXSk7XG5teUFwcC5jb250cm9sbGVyKCdsb2dpbkN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCkge1xuICAkc2NvcGUuZmlyc3ROYW1lID0gJyc7XG4gICRzY29wZS5Mb2dpbkVyciA9ICcxMjMxMjMnO1xuICAkc2NvcGUuc2hvdyA9IGZhbHNlO1xuICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbiAoZSkge1xuICAgICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6IFwiL2FqYXhMb2dpblwiLFxuICAgICAgZGF0YTogeyAndXNlcm5hbWUnOiAkc2NvcGUuX3VzZXJuYW1lLCAncGFzc3dvcmQnOiAkc2NvcGUuX3Bhc3N3b3JkIH1cbiAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgIGlmIChkYXRhLnN0YXR1cykge1xuICAgICAgICAkc2NvcGUuc2hvdyA9IHRydWU7XG4gICAgICAgICRzY29wZS5Mb2dpbkVyciA9IFwi55So5oi35ZCN5oiW5a+G56CB6ZSZ6K+vXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvJztcbiAgICAgIH1cbiAgICB9KS5lcnJvcihmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAkc2NvcGUuTG9naW5FcnIgPSBzdGF0dXM7XG4gICAgfSk7XG4gIH07XG59KTsiXX0=
