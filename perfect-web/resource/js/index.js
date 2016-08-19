import {Service} from './common/service'

var $hideLi = $('.perfect-nav .hide-li');
var $perfectPills = $('.perfect-pills');
var service = new Service();


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
function setDynamicHTML(opt) {
  return '<div class="title-content">' +
    '<img class="title-img" src="../images/a0.jpg">' +
    '<p class="title-name">' + opt.name + '</p>' +
    '<p class="title-time">' + opt.time + '</p>' +
    '<p class="title-text">' + opt.text + '</p>' +
    '</div>'

}

function getDynamic() {
  service.ajaxPost('/getDynamic', {}, function (err, result) {
    if (!err) {
      $.each(result.result, function (i, r) {
        var opts = {
          name: r.username,
          time: '2016-8-9',
          text: r.dynamic_text
        };
        $('.index-content').append(setDynamicHTML(opts));
      })
    }
  })
}
getDynamic();
