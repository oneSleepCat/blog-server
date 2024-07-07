// 加密
const crypo = require('crypto');

// 密钥
const SECRET_KEY = 'BLOG_2024#';

const md5 = (val)=>{
  const md5 = crypo.createHash('md5');

  return md5.update(val).digest('hex');
}

const genPassword = (password)=>{
  const str = `password=${password}&key=${SECRET_KEY}`;
  return md5(str);
};

module.exports = {
  genPassword,
}