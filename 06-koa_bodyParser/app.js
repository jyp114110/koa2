const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
// 引入 bodyparser
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = Router()

// 启用模板引擎
app.use(views('public', { map: { html: 'ejs' } }))

// 启用 bodyparser
app.use(bodyParser())
// app.use((ctx, next) => {
//   console.log(ctx.request.url)
//   next()
// })

// 配置路由
router.get('/', async (ctx, next) => {
  ctx.body = '首页'
})
router.get('/form', async (ctx, next) => {
  await ctx.render('form')
})
router.post('/doAdd', async (ctx, next) => {
  console.log(ctx.req)
  console.log(ctx.request)
  ctx.body = 11
})
// 启用路由
app.use(router.routes())
app.use(router.allowedMethods())
// 设置端口，开启服务器
app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
