const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const morgan = require('koa-morgan');
const cors = require('koa2-cors');
const path = require('path');
const fs = require('fs');
const { REDIS_CONF } = require('./conf/db');

const index = require('./routes/index');
const users = require('./routes/users');
const user = require('./routes/user');
const blog = require('./routes/blog');
const test = require('./routes/test');

const ENV = process.env.NODE_ENV;

// error handler
onerror(app);

app.use(
  cors({
    origin: () => {
      if (ENV === 'prod') {
        return 'https://blog.chenruiweb.com';
      }
      return 'https://localhost:8000';
    },
    allowMethods: ['GET', 'POST'],
    credentials: true,
  })
);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'pug',
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 日志记录
if (ENV === 'prod') {
  app.use(morgan('dev'));
} else {
  // 获取文件路径
  const filePath = path.resolve(__dirname, 'logs', 'access.log');
  // 创建写入流
  const writeStream = fs.createWriteStream(filePath, {
    flags: 'a', // 追加内容
  });
  // 配置 log
  app.use(
    morgan('combined', {
      stream: writeStream,
    })
  );
}

// session 配置
app.keys = ['BLOG_2024#'];

app.use(
  session({
    // cookie 配置
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 过期时间
    },
    // redis 配置
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
  })
);

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(user.routes(), user.allowedMethods());
app.use(blog.routes(), blog.allowedMethods());
app.use(test.routes(), test.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
