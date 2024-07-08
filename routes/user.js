const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { login, register } = require('../controller/user');

router.prefix('/api/user');

router.post('/register', async (ctx, next) => {
  try {
    const { username, password, realname } = ctx.request.body;

    const result = await register({ username, password, realname });

    if (result?.id) {
      ctx.body = new SuccessModel({
        message: '注册成功',
      });
    } else {
      ctx.body = new ErrorModel({
        message: '注册失败',
      });
    }
  } catch (error) {
    ctx.body = new ErrorModel({
      message: error || '注册失败',
    });
  }
});

router.post('/login', async (ctx, next) => {
  try {
    const { username, password } = ctx.request.body;

    const result = await login({ username, password });

    if (result) {
      ctx.session.username = result.username;
      ctx.session.realname = result.realname;
      ctx.body = new SuccessModel({
        message: '登陆成功',
      });
    } else {
      ctx.body = new ErrorModel({
        message: '登陆失败，密码或用户名错误',
      });
    }
  } catch (error) {
    ctx.body = new ErrorModel({
      message: error || '登陆失败，密码或用户名错误',
    });
  }
});

router.get('/session-test', async (ctx, next) => {
  if (ctx.session.viewNum == null) {
    ctx.session.viewNum = 0;
  }
  ctx.session.viewNum++;

  ctx.body = {
    errno: 0,
    count: ctx.session.viewNum,
  };
});

module.exports = router;
