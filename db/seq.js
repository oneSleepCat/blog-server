const Sequelize = require('sequelize');
const { MYSQL_CONF } = require('../conf/db');

const {host, database, user, password} = MYSQL_CONF;

const env = process.env.NODE_ENV; // 环境变量

// 配置
const conf = {
  host,
  dialect: 'mysql',
};

// 生产环境使用连接池
if (env === 'prod') {
  conf.pool = {
    max: 5, // 连接池中最大的连接数
    min: 0, // 连接池中最小的连接数
    idle: 10 * 1000, // 如果一个连接 10s 内没有被使用，则释放
  };
}

// 创建 Sequelize 实例
const seq = new Sequelize(
  database, // 数据库名称
  user, // 用户名
  password, // root 密码
  conf
);

// 测试连接
// seq
//   .authenticate()
//   .then(() => {
//     console.log('连接成功');
//   })
//   .catch(() => {
//     console.error('连接失败');
//   });

module.exports = seq;
