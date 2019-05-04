const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = Router()

// 中间件执行顺序
app.use(async (ctx, next) => {
  console.log(1)
  next()
  console.log(2)
})

router.get('/', async (ctx, next) => {
  console.log(3)
  ctx.body = '首页'
  next()
  console.log(4)
})

router.get('/news', async (ctx, next) => {
  ctx.boy = '新闻'
})

app.use(router.routes())
app.use(router.allowedMethods())
// // 中间件执行顺序
app.use(async (ctx, next) => {
  console.log(5)
  next()
  console.log(6)
})

app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
