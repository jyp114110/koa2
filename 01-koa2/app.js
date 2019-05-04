const koa = require('koa')
const app = new koa()

app.use(async ctx => {
  ctx.body = 'heoll koa2'
})

app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
