const User = require('../db/model/User');
const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/cryp');

const login = async params => {
  let { username, password } = params;

  // 预防 sql 注入攻击
  // username = escape(username);
  password = genPassword(password); // 密码加密
  // password = escape(password);

  const user = await User.findOne({
    // 查询条件
    where: {
      username,
      password,
    },
  });

  if (user == null) return null;
  return user.dataValues;
};

const register = async params => {
  let { username, password, realname } = params;

  // 预防 sql 注入攻击
  // username = escape(username);
  password = genPassword(password); // 密码加密
  // password = escape(password);

  const user = await User.create({
    username,
    password,
  });

  if (user == null) return null;
  return user.dataValues;
};

// const login = async params => {
//   let { username, password } = params;

//   // 预防 sql 注入攻击
//   username = escape(username);
//   // password = genPassword(password); // 密码加密
//   password = escape(password);

//   console.log('login', password);

//   const sql = `select * from users where username=${username} and password=${password}`;

//   return exec(sql);
// };

module.exports = {
  login,
  register,
};
