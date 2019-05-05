const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
// 引入 koa-static
const static = require('koa-static')
const path = require('path')

const app = new Koa()
const router = Router()

app.use(views('views', { map: { html: 'ejs' } }))
// 启用 koa-static
// app.use(static('static'))
// app.use(static(path.join(__dirname, './static')))
app.use(static(__dirname + '/static'))

router.get('/index', async (ctx, next) => {
  await ctx.render('index')
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
