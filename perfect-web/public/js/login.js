(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AJAX_TIMEOUT = 600000;

var Service = exports.Service = function () {
  function Service() {
    _classCallCheck(this, Service);
  }

  _createClass(Service, [{
    key: 'ajax',
    value: function ajax(type, url, data, callback) {
      $.ajax({
        type: type,
        url: url,
        data: data,
        timeout: AJAX_TIMEOUT,
        success: function success(data) {
          if (data.status) {
            if (data.status === 'OK') {
              callback(null, data.data, data.message);
              return;
            }
            callback(data);
            return;
          }
          callback(null, data);
        },
        error: function error(jqXHR, textStatus, errorThrown) {
          callback(errorThrown);
        }
      });
    }
  }, {
    key: 'ajaxPost',
    value: function ajaxPost(url, data, callback) {
      this.ajax('post', url, data, callback);
    }
  }, {
    key: 'ajaxGet',
    value: function ajaxGet(url, data, callback) {
      this.ajax('get', url, data, callback);
    }
  }]);

  return Service;
}();
},{}],2:[function(require,module,exports){
'use strict';

var _service = require('./common/service');

var $loginContainer = $('.container-login');
var $username = $('.username', $loginContainer);
var $password = $('.password', $loginContainer);
var service = new _service.Service();

$loginContainer.on('click', '.login-btn', function (e) {
  e.preventDefault();
  service.ajaxPost('/ajaxLogin', { username: $username.val(), password: $password.val() }, function (err, result) {
    if (!err) {
      window.location.href = '/';
    } else {
      $('.err-msg').css('visibility', 'visible');
      $('.err-msg').text(err.msg);
    }
  });
});
},{"./common/service":1}]},{},[2])


//# sourceMappingURL=login.js.map
