import {Service} from './common/service'

var $loginContainer = $('.container-login');
var $username = $('.username',$loginContainer);
var $password = $('.password',$loginContainer);
var service = new Service();

$loginContainer.on('click','.login-btn',function(e){
  e.preventDefault();
  service.ajaxPost('/ajaxLogin',{username:$username.val(),password:$password.val()},function(err,result){
    if(!err){
      window.location.href = '/';
    }
    else{

      $('.err-msg').css('visibility','visible');
      $('.err-msg').text(err.msg);
    }
  })
});
