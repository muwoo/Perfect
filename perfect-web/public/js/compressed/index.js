'use strict';

var $hideLi = $('.perfect-nav .hide-li');
var $perfectPills = $('.perfect-pills');
$hideLi.on('mouseover', function (e) {
  $perfectPills.show();
});
$hideLi.on('mouseout', function (e) {
  $perfectPills.hide();
});