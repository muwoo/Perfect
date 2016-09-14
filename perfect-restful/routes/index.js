exports.index = function (req, res, next) {
  if (!req.session.user) {
    if (req.url == "/login") {
      next();//如果请求的地址是登录则通过，进行下一个请求
    }
    else {
      res.redirect('/login');
    }
  } else if (req.session.user) {
    res.render('layout', {
      user: {
        title: '首页',
        username: req.session.user,
        userid: req.session.userid,
        discribe: req.session.discribe,
        index: true
      }
    });
  }
};