exports.users = {
  login:function(req, res){
    var username = req.body.username;
    req.getConnection(function(err, conn) {
      if (err) {
        return next(err);
      } else {
        conn.query('select * from user where username = "'+username+'"', [], function(err,result) {
          if (err) {
            return next(err);
          } else {
            if(result.length){
              res.send({'status':0,'msg':'success'});
              return;
            }
            res.send({'status':1,'msg':'用户名或密码错误'});
          }
        });
      }
    });
  },
  renderLogin:function(req, res){
    res.render('login');
  }
};
