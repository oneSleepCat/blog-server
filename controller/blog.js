const xss = require('xss');
const { exec } = require('../db/mysql');

const getBlogList = async params => {
  const { author, keyword } = params;

  let sql = `select * from blogs where 1=1 `;

  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += 'order by id desc';

  return await exec(sql);
};

const getBlogDetail = async params => {
  const { id } = params;

  let sql = `select * from blogs where 1=1 and id=${id};`;

  return await exec(sql);
};

const createBlog = async params => {
  let { author, title, content, createTime } = params;

  // 防止 xss 攻击
  title = xss(title);
  content = xss(content);

  const sql = `insert into blogs(author, title, content, createTime) values('${author}', '${title}', '${content}', ${createTime});`;

  return exec(sql);
};

const updateBlog = async params => {
  const { id, author, title, content } = params;

  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`;

  return exec(sql);
};

const deleteBlog = async params => {
  const { id } = params;

  const sql = `delete from blogs where id=${id}`;

  return await exec(sql);
};

module.exports = {
  getBlogList,
  getBlogDetail,
  createBlog,
  updateBlog,
  deleteBlog,
};
