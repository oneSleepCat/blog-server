const Sequelize = require('sequelize');
const seq = require('../seq');

// blog 模型
const Blog = seq.define('blog', {
  // id createAt updateAt 不需要自己定义，sequelize 会自动创建

  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Blog;
