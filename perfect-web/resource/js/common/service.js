var AJAX_TIMEOUT = 600000;
export class Service {
  constructor() {
  }
  ajax(type, url, data, callback) {
    $.ajax({
      type: type,
      url: url,
      data: data,
      timeout: AJAX_TIMEOUT,
      success: function (data) {
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
      error: function (jqXHR, textStatus, errorThrown) {
        callback(errorThrown);
      }
    });
  }
  ajaxPost(url, data, callback){
    this.ajax('post', url, data, callback);
  }
  ajaxGet(url, data, callback){
    this.ajax('get', url, data, callback);
  }
}
