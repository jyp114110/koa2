const Koa = require('koa')
const router = require('koa-router')()

const app = new Koa()

router.get('/', async (ctx, next) => {
  ctx.body = '首页'
})
// 动态路由的处理
router.get('/news/:aid/:cid', async (ctx, next) => {
  console.log(ctx.params)
  ctx.body = `新闻业 ${ctx.params}`
})

// get路由 传参
router.get('/index', async (ctx, next) => {
  console.log(ctx.query)
  ctx.body = 'index'
})

//启用路由
app.use(router.routes())
app.use(router.allowedMethods())

// 设置端口，开启路由
app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
