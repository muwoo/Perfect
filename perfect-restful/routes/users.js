var crypto=require('crypto');
var $=require('underscore');
var uuid = require('node-uuid');
//密码加密解密
var DEFAULTS = {
  encoding: {
    input: 'utf8',
    output: 'hex'
  },
  algorithms: ['bf', 'blowfish', 'aes-128-cbc']
};
function MixCrypto(options) {
  if (typeof options == 'string'){
    options = { key: options };
  }

  options = $.extend({}, DEFAULTS, options);
  this.key = options.key;
  this.inputEncoding = options.encoding.input;
  this.outputEncoding = options.encoding.output;
  this.algorithms = options.algorithms;
}

MixCrypto.prototype.encrypt = function (plaintext) {
  return $.reduce(this.algorithms, function (memo, a) {
    var cipher = crypto.createCipher(a, this.key);
    return cipher.update(memo, this.inputEncoding, this.outputEncoding)
      + cipher.final(this.outputEncoding)
  }, plaintext, this);
};
MixCrypto.prototype.decrypt = function (crypted) {
  try {
    return $.reduceRight(this.algorithms, function (memo, a) {
      var decipher = crypto.createDecipher(a, this.key);
      return decipher.update(memo, this.outputEncoding, this.inputEncoding)
        + decipher.final(this.inputEncoding);
    }, crypted, this);
  } catch (e) {
    return;
  }
};

exports.users = {
  renderRegister:function (req, res) {
    res.render('register', {'title': '注册'});
  },
  register:function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;
    req.getConnection(function (err, conn) {
      if (err) {
        return next(err);
      } else {
        var mixCrypto = new MixCrypto('string');
        var passwordMd5 = mixCrypto.encrypt(password);
        var userId = uuid.v1().replace(/-/g, '');
        conn.query('INSERT INTO user (username, enabled, id, password) VALUES ("'+username+'", "1", "'+userId+'", "'+passwordMd5+'")', [], function (err, result) {
          if (err) {
          } else {
            console.log(result);
            req.session.user = username;
            req.session.userid = userId;
            res.redirect('/');
          }
        });
      }
    });
  },
  login: function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    req.getConnection(function (err, conn) {
      if (err) {
        return next(err);
      } else {
        var mixCrypto = new MixCrypto('string');
        conn.query('select * from user where username = "' + username + '"', [], function (err, result) {
          if (err) {
          } else {
            for(var i = 0;i<result.length;i++){
              if(mixCrypto.decrypt(result[i].password) === password){
                req.session.user = username;
                req.session.userid = result[i].id;
                req.session.discribe = result[i].discribe;
                res.render('index', {'user': username});
                return;
              }
            }
            res.send({'status': 1, 'msg': '用户名或密码错误'});
          }
        });
      }
    });
  },
  renderLogin: function (req, res) {
    res.render('login');
  },
  logout: function (req, res) {
    req.session.user = null;
    res.redirect('/login');
  },
  getDynamic: function(req, res) {
    var id = req.session.userid;
    req.getConnection(function (err, conn) {
      if (err) {
        return next(err);
      } else {
        conn.query('select * from user_dynamic where id = "' + id +'" order by creationDate desc', [], function (err, result) {
          if (err) {
          } else {
            if(result.length){
              res.send({'status': 0, 'result': result});
              return;
            }
            res.send({'status': 1, 'msg': '查询错误'});
          }
        });
      }
    })
  },
  page:function(req, res){
    res.render('index',{user:{title: '个人中心',username:req.session.user,index:true} })
  },
  comment: function(req, res){
    req.getConnection(function (err, conn) {
      if (err) {
        return next(err);
      } else {
        conn.query('insert into user_dynamic (username,dynamic_text,creationDate,id) values("'+req.session.user+'","'+req.body.content+'","'+req.body.date+'","'+req.session.userid+'")', [], function (err, result) {
          if (err) {
          } else {
            res.send({'status': 0, 'result': result});
            //if(result.length){
            //  res.send({'status': 0, 'result': result});
            //  return;
            //}
            //res.send({'status': 1, 'msg': '查询错误'});
          }
        });
      }
    })
  },
  getFriendsList: function(req,res){
    req.getConnection(function (err, conn) {
      if (err) {
        return next(err);
      } else {
        conn.query('select friendsId from friends where userid='+req.session.userid, [], function (err, result) {
          if (err) {
          } else {
            var friends = [];
            var _script = 0;
            for(var i=0;i<result.length;i++){
              conn.query('select * from user where id="'+result[i].friendsId+'"', [], function (err, r) {
                if(err){
                  console.log(err);
                }else{
                  friends.push(r);
                  _script++;
                  if(_script === result.length){
                    res.send({'status': 0, 'result': friends})
                  }
                }
              })
            }
          }
        });
      }
    })
  }
};
