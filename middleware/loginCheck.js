const { ErrorModel } = require('../model/resModel');

const loginCheck = async (ctx, next) => {
  if (ctx.session.username) {
    await next();
    return;
  }
  ctx.body = new ErrorModel({
    message: '暂未登陆',
  });
};

module.exports = loginCheck;
