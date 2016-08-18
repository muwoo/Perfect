var $hideLi = $('.perfect-nav .hide-li');
var $perfectPills = $('.perfect-pills');

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
