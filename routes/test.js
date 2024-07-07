const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { login } = require('../controller/user');

router.prefix('/api/test');

router.get('/env', async (ctx, next) => {
  ctx.body = {
    errno: 0,
    count: `koa2 test, env: ${process.env.NODE_ENV} `,
  };
});

module.exports = router;
