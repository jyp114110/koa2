const Koa = require('koa')
const Router = require('koa-router')
const template = require('koa-art-template')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const fs = require('fs')
const path = require('path')

const app = new Koa()
const router = Router()

template(app, {
  root: path.join(__dirname, 'pages'), // 模板 所在的 路径
  extname: '.html', // 模板 后缀名
  debug: process.env.NODE_ENV !== 'production' // 是否开启 代码调试
})
app.use(static(__dirname + '/assets'))
app.use(bodyParser())

router.get('/', async (ctx, next) => {
  // ctx.body = '首页'
  let data = await readData()
  await ctx.render('index', JSON.parse(data))
})

router.get('/index', async (ctx, next) => {
  let data = await readData()
  await ctx.render('index', JSON.parse(data))
})

router.get('/details', async (ctx, next) => {
  let data = await readData()
  let id = ctx.query.id
  data = JSON.parse(data).list.find(item => item.id == id)
  // data = JSON.parse(d)
  await ctx.render('details', data)
})

router.get('/submit', async (ctx, next) => {
  await ctx.render('submit')
})

router.post('/add', async (ctx, next) => {
  let info = ctx.request.body
  console.log(info)
  let data = await readData()

  data = JSON.parse(data)

  if (data.list.length === 0) {
    info.id = 1
  } else {
    info.id = data.list[data.list.length - 1].id + 1
  }
  // console.log(info)
  data.list.push(info)
  console.log(data)
  data = JSON.stringify(data, null, 2)
  let flag = await writeData(data)
  if (flag === 'success') {
    ctx.redirect('/index')
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
// 读取数据的 Promise 操作
function readData() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

// 写入数据的 Promise 操作
function writeData(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, 'data', 'data.json'), data, err => {
      if (err) reject(err)
      resolve('success')
    })
  })
}
