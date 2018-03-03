# koa-parser[![Build Status](https://travis-ci.org/nashaofu/koa-parser.svg?branch=master)](https://travis-ci.org/nashaofu/koa-parser)
a body parser for koa. support json, form(urlencoded), multipart and text type body.

## Install

[![NPM](https://nodei.co/npm/koa-parser.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/koa-parser/)

## Usage

```js
const Koa = require('koa')
const parser = require('koa-parser')

const port = 3000
const app = new Koa()

app.use(parser())

app.use(async (ctx, next) => {
  // if nothing was parsed, body will be undefined
  if (ctx.request.body !== undefined) {
    ctx.body = ctx.request.body
  }
  await next()
})

app.listen(port)
console.error(`listening on port ${port}`)
```

## Screenshot

![default options](./screenshot/1.png)

## Options

```typescript
app.use(parser({
  encoding?: string, // requested encoding
  error?: (err: any, ctx: Koa.Context) => any, // support custom parser error handle
  json?: string | string[], // support json parser types
  multipart?: string | string[], // support multipart(form-data) parser types
  text?: string | string[], // support text parser types
  urlencoded?: string | string[] // support urlencoded(form) parser types
}))
```

* **encoding**: requested encoding. Default is ``utf-8``

* **error**: support custom error handle, Default is ``false``. if koa-bodyparser throw an error, you can customize the response like:
  ```js
  app.use(parser({
    error (err, ctx) {
      console.log(err)
      ctx.throw(err, 422)
    }
  }))
  ```

* **json**: Extended support for json parsing options, The default supported types are ``['application/json', 'application/json-patch+json', 'application/vnd.api+json', 'application/csp-report']``. you can customize the type like:
  ```js
  // json will be support default types and application/x-javascript
  app.use(parser({
    json: 'application/x-javascript' // You can also pass parameters in an array
  }))
  ```

* **multipart**: Extended support for multipart(form-data) parsing options, The default supported types are ``['multipart/form-data']``

* **text**: Extended support for text parsing options, The default supported types are ``['text/plain']``

* **urlencoded**: Extended support for urlencoded(form) parsing options, The default supported types are ``['application/x-www-form-urlencoded']``

## Licences

[MIT](LICENSE)
