const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const getDate = require('./module/getDate')

const app = new Koa()
const router = Router()

app.use(views('public', { map: { html: 'ejs' } }))
app.use(router.routes())
app.use(router.allowedMethods())

router.get('/', async (ctx, next) => {
  console.log(ctx.req)
  ctx.body = '首页'
})

router.get('/form', async (ctx, next) => {
  await ctx.render('form')
})

router.post('/doAdd', async (ctx, next) => {
  let str = await getDate(ctx)
  ctx.body = str
})

app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
