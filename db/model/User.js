const Sequelize = require('sequelize');
const seq = require('../seq');

// user 模型
const User = seq.define(
  'user', // 对应同步到数据库的 user 表（复数）
  {
    // id createAt updateAt 不需要自己定义，sequelize 会自动创建

    username: {
      type: Sequelize.STRING, // 字段类型
      allowNull: false, // 是否运行为空
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    realname: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  }
);

module.exports = User;
