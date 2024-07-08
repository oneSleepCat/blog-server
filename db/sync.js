const seq = require('./seq');

// 需要同步的模型
require('./model/User');
require('./model/Blog');

seq.sync({ force: true }).then(() => {
  process.exit(); // 同步后退出进程
});
