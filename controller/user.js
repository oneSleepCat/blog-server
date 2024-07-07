const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/cryp');

const login = async params => {
  let { username, password } = params;

  // 预防 sql 注入攻击
  username = escape(username);
  password = genPassword(password); // 密码加密
  password = escape(password);

  console.log('login', password);

  const sql = `select * from users where username=${username} and password=${password}`;

  return exec(sql);
};

module.exports = {
  login,
};
