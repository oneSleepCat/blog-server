const xss = require('xss');
const Sequelize = require('sequelize');
const { exec } = require('../db/mysql');
const Blog = require('../db/model/Blog');

// 使用 sequelize
const getBlogList = async params => {
  const { author, keyword } = params;

  const blogs = await Blog.findAll({
    // 查询条件
    where: {
      author,
      title: {
        [Sequelize.Op.like]: `%${keyword}%`,
      },
    },
    // 排序
    order: [['id', 'desc']],
  });
  return blogs.map(blog => blog.dataValues);
};

const createBlog = async params => {
  const { title, content, author } = params;

  // 防止 xss 攻击
  // title = xss(title);
  // content = xss(content);

  const blog = await Blog.create({
    title,
    content,
    author,
  });

  if (blog == null) return null;
  return blog.dataValues;
};

const getBlogDetail = async params => {
  const { id } = params;

  const blog = await Blog.findOne({
    where: {
      id,
    },
  });

  return blog;
};

const updateBlog = async params => {
  const { id, author, title, content } = params;

  const result = await Blog.update(
    // 要修改的内容
    {
      title,
      content,
    },
    // 条件
    {
      where: {
        id,
        author,
      },
    }
  );

  return result;
};

const deleteBlog = async params => {
  const { id, author } = params;

  const result = await Blog.destroy({
    where: {
      id,
      author,
    },
  });

  return result;
};

// 执行原始 sql 语句
// const getBlogList = async params => {
//   const { author, keyword } = params;

//   let sql = `select * from blogs where 1=1 `;

//   if (author) {
//     sql += `and author='${author}' `;
//   }
//   if (keyword) {
//     sql += `and title like '%${keyword}%' `;
//   }
//   sql += 'order by id desc';

//   return await exec(sql);
// };

// const getBlogDetail = async params => {
//   const { id } = params;

//   let sql = `select * from blogs where 1=1 and id=${id};`;

//   return await exec(sql);
// };

// const createBlog = async params => {
//   let { author, title, content, createTime } = params;

//   // 防止 xss 攻击
//   title = xss(title);
//   content = xss(content);

//   const sql = `insert into blogs(author, title, content, createTime) values('${author}', '${title}', '${content}', ${createTime});`;

//   return exec(sql);
// };

// const updateBlog = async params => {
//   const { id, author, title, content } = params;

//   const sql = `update blogs set title='${title}', content='${content}' where id=${id}`;

//   return exec(sql);
// };

// const deleteBlog = async params => {
//   const { id } = params;

//   const sql = `delete from blogs where id=${id}`;

//   return await exec(sql);
// };

module.exports = {
  getBlogList,
  getBlogDetail,
  createBlog,
  updateBlog,
  deleteBlog,
};
