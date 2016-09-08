exports.charts = function(req, res, next){
  if (!req.session.user) {
    if(req.url=="/login"){
      next();//如果请求的地址是登录则通过，进行下一个请求
    }
    else
    {
      res.redirect('/login');
    }
  } else if (req.session.user) {
    res.render('charts/chartHome', {user:{title: '图表',username:req.session.user,charts:true} });
  }
};
