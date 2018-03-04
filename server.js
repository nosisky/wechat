import Koa from 'koa';
import bodyParser from 'koa-parser';
import Router from 'koa-router';
import convert from 'koa-convert';
import koaRes from 'koa-res';
import webpackMiddleware from 'koa-webpack-dev-middleware';
import webpack from 'webpack';
import serve from 'koa-static';

import webpackConfigDev from './webpack.config.dev';
import userRouter from './server/routes/userRouter';
import chatRouter from './server/routes/chatRouter';

const server = new Koa();

const PORT = 3000 || process.env.PORT;

if (process.env.NODE_ENV === 'development') {
  server.use(webpackMiddleware(webpack(webpackConfigDev)));
}

// const router = new Router();

// serve files in public folder (css, js etc)
server.use(serve(__dirname + '/client/public'));

server.use(bodyParser());

// format response as JSON

server.use(userRouter.routes())
server.use(chatRouter.routes())

server.listen(PORT, () => {
  console.log('Yay! connected!', PORT)
})
