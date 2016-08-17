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