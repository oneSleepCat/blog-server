const env = process.env.NODE_ENV; // 环境参数

let MYSQL_CONF; // MySQL 配置
let REDIS_CONF; // Redis 配置

if (env === 'dev') {
  MYSQL_CONF = {
    hots: 'localhost',
    user: 'root',
    password: 'mysql_2024',
    port: '3306',
    database: 'studyBlog',
  };

  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
  };
}

if (env === 'prod') {
  MYSQL_CONF = {
    hots: '120.26.123.78',
    user: 'root',
    password: 'mysql_2024',
    port: '3306',
    database: 'blogData',
  };

  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
  };
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
