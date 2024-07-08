const router = require('koa-router')();
const {
  getBlogList,
  getBlogDetail,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

router.prefix('/api/blog');

router.get('/list', async (ctx, next) => {
  try {
    const { author = '', keyword = '' } = ctx.query;
    const result = await getBlogList({ author, keyword });

    ctx.body = new SuccessModel({
      data: result,
    });
  } catch (error) {
    ctx.body = new ErrorModel({
      message: error,
    });
  }
});

router.post('/detail', async (ctx, next) => {
  try {
    const { id } = ctx.request.body;
    const result = await getBlogDetail({ id });
    if (result) {
      ctx.body = new SuccessModel({
        data: result,
      });
    } else {
      ctx.body = new ErrorModel({
        message: '该博客不存在',
      });
    }
  } catch (error) {
    ctx.body = new ErrorModel({
      message: error,
    });
  }
});

router.post('/new', loginCheck, async (ctx, next) => {
  try {
    const { title, content } = ctx.request.body;

    const author = ctx.session.username;

    const result = await createBlog({
      title,
      content,
      author,
    });

    if (result.id) {
      ctx.body = new SuccessModel({
        data: { id: result.id },
        message: '创建成功',
      });
    } else {
      ctx.body = new SuccessModel({
        message: '创建失败',
      });
    }
  } catch (error) {
    ctx.body = new SuccessModel({
      message: error || '创建失败',
    });
  }
});

router.post('/update', loginCheck, async (ctx, next) => {
  try {
    const { id, title, content } = ctx.request.body;

    const author = ctx.session.username;

    const result = await updateBlog({ id, title, content, author });

    if (result[0]) {
      ctx.body = new SuccessModel({
        data: null,
        message: '更新成功',
      });
    } else {
      ctx.body = new SuccessModel({
        message: '更新失败',
      });
    }
  } catch (error) {
    ctx.body = new SuccessModel({
      message: error || '更新失败',
    });
  }
});

router.post('/del', loginCheck, async (ctx, next) => {
  try {
    const { id } = ctx.request.body;
    const author = ctx.session.username;
    const result = await deleteBlog({ id, author });
    if (result !== 0) {
      ctx.body = new SuccessModel({
        data: null,
        message: '删除成功',
      });
    } else {
      ctx.body = new SuccessModel({
        message: '删除失败',
      });
    }
  } catch (error) {
    ctx.body = new SuccessModel({
      message: error || '删除失败',
    });
  }
});

module.exports = router;
