/**
 * Created by monkeyWang
 */
exports.drictive = {
  header: function (req, res, next) {
    if (!req.session.user) {
      if (req.url == "/login") {
        next();//如果请求的地址是登录则通过，进行下一个请求
      }
      else {
        res.redirect('/login');
      }
    } else if (req.session.user) {
      res.render('header', {user: {title: '首页', username: req.session.user, index: true}});
    }
  },
  chat: function (req, res, next) {
    if (!req.session.user) {
      if (req.url == "/login") {
        next();//如果请求的地址是登录则通过，进行下一个请求
      }
      else {
        res.redirect('/login');
      }
    } else if (req.session.user) {
      res.render('chat/chatHome', {user: {title: '首页', username: req.session.user, index: true}});
    }
  }
};