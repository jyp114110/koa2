# Koa

## 一、Koa 的基本使用

​	koa 是由 express 原班人马打造的，致力于成为更小、更富有表现力、更健壮的 Web 框架。

​	使用 koa 编写 web 应用，可以免除重复繁琐的回调函数嵌套，并极大的提升错误处理的效率。

​	koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。

​	koa 的开发思路和 express 差不多，最大的特点是避免异步嵌套。

### (一) koa 的简单使用

#### 1、安装

```js
npm i koa
```

**注意： Node.js 必须是 7.6 以上版本**

#### 2、简单使用

```js
// 1、引入 koa
const Koa = require('koa')

// 2、创建服务器
const app = new Koa()

// 3、配置中间件(可以相当路由使用)
// ctx(context) 相当于  request 和 response
app.use(async(ctx,next)=>{
    ctx.body = 'hello koa2' //ctx.body 相当于 res.writeHead 和 res.end()
})

// 4、设置端口，开启服务器
app.listen(9999,()=>console.log('开启服务'))
```

**注意**

- `ctx`  (context) 上下文
  - `ctx.req` 相当于 `ctx.request`  **但是 二者之间存在一定的区别**
  - `ctx.res` 相当于 `ctx.response`    **但是 二者之间存在一定的区别**

## 二、koa 路由

​	**路由**： 路由就是 根据不同的 URL 地址，加载不同的页面实现不同的功能。

​	koa 中的路由和 express 有所不同。在 express 中 直接引入 **expreess.Router**  就可以配置，但是在 koa 中 我们需要安装对应的 **koa-router** 路由模块来实现。

### (一)  基本使用

- 第一步 ： 下载 和 安装 路由模块

```js
npm i koa-router
```

- 第二步： 引入 和使用

```js
// 1、引入 koa
const Koa = require('koa')

// 2、引入 koa-router
const Router = require('koa-router')
const router = Router()

// 3、创建服务器
const app = new Koa()

// 4、处理路由（路由匹配）
router.get('/',async(ctx,next)=>{
    ctx.body = 'hello koa'
})

router.get('news',async(ctx,next)=>{
    ctx.body = 'news'
})

// 5、启动路由
app.use(router.routes()) // 5.1、启动路由
app.use(router.allowedMethods()) // 5.2、官方推荐：根据 ctx.status 设置 response 响应头

// 6、设置端口，开启服务器
app.listen(9999,()=>console.log('启动服务器'))

```

**注意**

- 1、koa 中的 路由是 **精确匹配** 的 即：

> router.get('/index',async(ctx,next)=>{
>
> ​	//  只能 匹配到 '/index' 
>
> ​       //  无法 匹配到 'index.html'
>
> })

- 2、注意 **启用路由** 的所写的地方

> 必须先是 路由匹配（路由处理） --->  启用路由 ---> 设置端口，开启服务器
>
> 否则 在 启用模板引擎 是 会报错（报错信息： `TypeError: ctx.render is not a function`）

### (二) koa 路由获取 get 传值

​	在 koa 中 GET 传值通过 request接收，但是接收的方法有两种： 

- 1、 query： 返回的是格式化好的参数对象

- 2、querystring： 返回的是请求字符串

  ```js
  router.get('/',async(ctx,netx)=>{
      console.log(ctx.query) // 相当于 ctx.request.query , 返回的是 对象
      console.log(ctx.querystring) // 相当于 ctx.request.querystring , 返回的是 字符串
  })
  ```


### (三) koa 路由 获取 post 传值

- 利用 中间件 `koa-bodyparser`  实现

**使用步骤：**

- 第一步： 下载 引入 `npm i koa-bodyparser`
- 第二步： 启用

```js
const Koa = require('koa')
const Router = require('koa-router')
// 1、引入 koa-bodyparser
const bodyParser = require('koa-bodyparser')

// 2、 启用 koa-bodyparser
app.use(bodyParser())

// 路由匹配
router.post('/from',async(ctx,next)=>{
    // 3、获取 post 请求 的数据
    console.log(ctx.request.body)
    ctx.body = ctx.request.body
})

// 启用路由
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(9999,()=>console.log('开启服务器'))

```



### (四)  动态路由设置与获取

#### 1、基本使用

```js
// http://localhost:9999/index/123
// 将 123 赋值给 aid
// 设置 /index/:aid
router.get('/index/:aid',async(ctx,next)=>{
    // 获取动态路由： ctx.params
    console.log(ctx.params)
})
```

#### 2、动态路由传入多个值

```js
// http://localhost:9999/index/123/456
// 将 123 赋值给 aid； 将 456 赋值给 cid
// 设置 /index/:aid/:cid
router.get('/index/:aid/:cid',async(ctx,next)=>{
    // 获取动态路由
    console.log(ctx.params)
})
```





## 三、中间件

### (一) 中间件的概念及作用

​	**中间件：** 中间件就是 **匹配路由之前** 或者 **匹配路由之后**完成的一系列的操作。

​	在 **express** 中间件 是一个函数，它可以访问 **请求对象(request)**  和 **响应对象(response)**。

​	在 koa 中   中间件 和 express 有点类似

​	如果我的 get、 post 回调函数中， 没有 **next** 参数， 那么就匹配上第一个路由， 就不会往下匹配了。 如果想往下匹配的话， 那么需要写 **next()** 。



### (二) 中间件的执行顺序

#### 1、匹配路由之前-- 执行顺序

​	执行结果： 1 、3 、4、 2

```js
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = Router()

// 匹配路由之前 -- 中间件执行顺序
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

app.use(router.routes())
app.use(router.allowedMethods())
// // 中间件执行顺序
// app.use(async (ctx, next) => {
//   console.log(1)
//   next()
//   console.log(2)
// })

app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))


```

#### 2、匹配路由之后 -- 中间件执行顺序

​	执行顺序： 3 、1、 2、 4

```js
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = Router()

// 中间件执行顺序
// app.use(async (ctx, next) => {
//   console.log(1)
//   next()
//   console.log(2)
// })

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
// 匹配路由之后--中间件执行顺序
app.use(async (ctx, next) => {
  console.log(1)
  next()
  console.log(2)
})

app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))

```

#### 3、 整体执行顺序

​	执行顺序： 1 、3、 5、 6、 4 、2

````js
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = Router()

// 路由匹配之前--中间件执行顺序
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
// 路由匹配之后-- 中间件执行顺序
app.use(async (ctx, next) => {
  console.log(5)
  next()
  console.log(6)
})

app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))

````

## 四、静态资源托管

**使用步骤**

- 第一步： 下载并引入 `npm i koa-static`
- 第二步： 使用

```js
const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
// 引入 koa-static
const static = require('koa-static')
const path = require('path')

const app = new Koa()
const router = Router()

app.use(views('views', { map: { html: 'ejs' } }))
// 启用 koa-static 的三个方式
// app.use(static('static'))
// app.use(static(path.join(__dirname, './static')))
app.use(static(__dirname + '/static'))

router.get('/index', async (ctx, next) => {
  await ctx.render('index')
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))

```

**注意：**

- **1、html 中文件引入的路径文件**

> ```js
> // app.use(static('static)) 设置
> //  当 请求路径 为：
> // http://localhost:9999/css/basic.css
> // 它会 自动去 static文件夹下 寻找 css/basic.css
> // 因此 html 中文件引入地址 必须 省略  static 路径
> // 即：举例说明
> <image src="./static/css/basic.css"> // 错误
> <image src="css/basic.css"> // 正确
> ```
>
> 

- 2、koa中的静态资源可以配置多个

```js
app.use(static('static')) // 第一个静态资源配置
app.use(static('public')) // 第二个静态资源配置
```



## 五、模板引擎

#### 使用方法

​	**注意： **

- 1、公共信息如何使用
- 2、

> // 必须要有await，因为ctx.render 方法是异步执行的
>   await ctx.render('index', {
>
> ​	title: title
>
>   })

### (一) ejs 模板引擎的使用(了解)

> 

```js
//引入 koa模块

/*
ejs模板引擎的使用：

    1.npm install koa-views  --save

    2.npm install ejs  --save


    3.var views = require('koa-views');

    app.use(views(__dirname, { extension: 'ejs' }))   //模板的后缀名是ejs


    4 await ctx.render('index');

* */

var Koa = require('koa'),
  router = require('koa-router')(),
  views = require('koa-views')

var app = new Koa()

//配置模板引擎中间件  --第三方中间件
//app.use(views('views', { map: {html: 'ejs' }}));   //这样配置也可以  注意如果这样配置的话 模板的后缀名是.html
app.use(
  views('views', {
    extension: 'ejs' /*应用ejs模板引擎*/
  })
) //模板的后缀名是ejs

//写一个中间件配置公共的信息
/**
  * 注意：我们需要在每一个路由的render里面都要渲染一个公共的数据

    公共的数据放在这个里面，这样的话在模板的任何地方都可以使用
  */

ctx.state = {
  //放在中间件
  session: this.session,
  title: 'app'
}
app.use(async (ctx, next) => {
  ctx.state.userinfo = '张三'

  await next() /*继续向下匹配路由*/
})

router.get('/', async ctx => {
  let title = '你好ejs'
// 必须要有await render 方法是异步执行的
  await ctx.render('index', {
    title: title
  })
})
router.get('/news', async ctx => {
  //ctx.body='这是一个新闻';

  let list = ['11111', '22222', '33333']

  let content = '<h2>这是一个h2</h2>'

  let num = 12
  await ctx.render('news', {
    list: list,
    content: content,
    num: num
  })
})

app.use(router.routes()) /*启动路由*/
app.use(router.allowedMethods())
app.listen(3000)

```

#### 2、 ejs 基本语法

- Ejs 引入模板

```js
<%- include header.ejs %>
```

- Ejs 绑定数据

```js
<%=h%>
```

- Ejs 绑定 html 数据

```js
<%-h%>
```

- Ejs 模板判断语句

```js
<% if(true){ %>

	<div>true</div>

<%} else{ %>

	<div>false</div>

<%}%>

```

- Ejs 模板中循环数据

```js
<% for(var i=0;i<list.length;i++) { %> 
    <li><%=list[i] %></li>
<%}%>                                  
```

### (二) koa-art-template 模板引擎的使用

​	类似于 `express-art-template`

**使用步骤：**

- 第一步：下载 并 引入   ` npm i art-template`&&     `npm i koa-art-template`
- 第二步： 使用

```js
const Koa = require('koa')
const path = require('path')

// 1、 引入 koa-art-template
const template = require('koa-art-template')
const app = new Koa()

// 2、 配置 模板引擎
template(app,{
    root: path.join(__dirname,'public'), // 模板 所在的 路径
    extname: '.html', // 模板 后缀名
    debug: process.env.NODE_ENV !== 'production' // 是否开启 代码调试
})

// 3、使用
app.use(async (ctx,next)=>{
    await ctx.render('index')
})
```

