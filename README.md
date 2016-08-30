# Perfect

##项目安装
    安装nodejs
####前端
    cd Perfect/perfect-web
    npm install bower -g
    npm install
    bower install
    gulp build
    gulp watch

####后端
    cd Perfect/perfect-restful
    npm install
    安装mysql(安装 可视化工具Navicat for MySQL)
######1.数据库配置：
    perfect-restful/app.js
    修改
    dbOptions = {
          host: 'localhost',//主机
          user: 'root',//mysql 默认用户名
          password: '',//mysql 默认密码
          port: 3306, //mysql 默认端口
          database: 'myproject' //数据库
        };
    建表
    create table `user` (
      `username` varchar(50) default null,
      `salt` varchar(32) default null,
      `hash` varchar(32) default null,
      `userMobileNumber` varchar(20) default null,
      `creationDate` bigint(20) default null,
      `updateDate` bigint(20) default null,
      `enabled` tinyint(1) not null default 1,
      `id` varchar(32) NOT null,
      primary key (`id`),
      unique key `user__username` (`username`)
    ) engine=innodb default charset=utf8 collate=utf8_bin;

    create table `user_dynamic` (
          `username` varchar(50) default null,
          `dynamic_text` varchar(500) default null,
          `dynamic_commend` varchar(300) default null,
          `creationDate` bigint(20) default null,
          `image` varchar(100) default null,
          `id` varchar(32) NOT null,
        ) engine=innodb default charset=utf8 collate=utf8_bin;

######2.启动：
    cd Perfect/perfect-restful
    npm start
    http://localhost:3000

