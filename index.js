const Koa = require('koa')
const app = new Koa()
const serve = require('koa-static')

app.use(async(ctx, next) => {
  try {
    await next()
    const status = ctx.status || 404
    if (status === 404) {
        ctx.throw(404)
    }
  } catch (err) {
    ctx.status = err.status || 500
    if (ctx.status === 404) {
      //Your 404.jade
      ctx.body = 'Hello World'
    } else {
      //other_error jade
      await ctx.render('other_error')
    }
  }
})

app.use(serve('src'))

console.log('app running on locolhost:8080')
app.listen(8080)