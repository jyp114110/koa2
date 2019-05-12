const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const path = require('path')

const app = new Koa()
const router = Router()
app.use(static(path.join(__dirname, '/static')))
// app.use(static(path.join()))
let obj = { name: 'zs', age: 18 }

router.get('/index', (ctx, next) => {
  console.log(1)
  ctx.body = JSON.stringify(obj)
})

// 启动路由

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
