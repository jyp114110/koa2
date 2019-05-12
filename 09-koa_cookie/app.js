const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = Router()

router.get('/', async ctx => {
  let data = {
    a: 1,
    b: 'zh'
  }
  ctx.cookies.set('name', JSON.stringify(data), {
    // path: '/news'
  })
  ctx.body = '首页'
})

router.get('/news', async ctx => {
  let data = ctx.cookies.get('name')
  console.log(data)
  ctx.body = 'news'
})

router.get('/details', async ctx => {
  let data = ctx.cookies.get('name')
  ctx.body = data
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
