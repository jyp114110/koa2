const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const app = new Koa()
const router = Router()

// 启用模板引擎
app.use(views('public', { map: { html: 'ejs' } })) // 这样的配置模板的后缀名 就是 html

router.get('/index', async (ctx, next) => {
  let username = '张三'
  console.log(username)
  // 必须要有await render 方法是异步执行的
  await ctx.render('index', {
    title: `欢迎回来  ${username}`
  })
})

router.get('/news', async (ctx, next) => {
  let info = [11, 22, 33]
  await ctx.render('news', {
    list: info
  })
})

// 启动路由
app.use(router.routes())
app.use(router.allowedMethods())

// 设置端口，开启服务器
app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
