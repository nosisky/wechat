import Koa from 'koa';
import bodyParser from 'koa-parser';
import Router from 'koa-router';
import convert from 'koa-convert';
import koaRes from 'koa-res';
import webpackMiddleware from 'koa-webpack-dev-middleware';
import webpack from 'webpack';
import serve from 'koa-static';
import path from 'path';
import IO from 'koa-socket';

import webpackConfigDev from './webpack.config.dev';
import userRouter from './server/routes/userRouter';
import chatRouter from './server/routes/chatRouter';
import renderFile from './renderFile';
import socketEvent from './socketEvents';


const server = new Koa();
const router = new Router();
const io = new IO();

const PORT = 3000 || process.env.PORT;

if (process.env.NODE_ENV === 'development') {
  server.use(webpackMiddleware(webpack(webpackConfigDev)));
}

// serve files in public folder (css, js etc)
server.use(serve('./client/'));
server.use(serve('./client/public/'));


server.use(bodyParser());

io.attach(server)

socketEvent(io);

// // format response as JSON
server.use(userRouter.routes())
server.use(chatRouter.routes())


router
  .get('*', async (ctx) => {
    ctx.body = await renderFile(__dirname + '/client/index.html')
  })
server.use(router.routes());

server.listen(PORT, () => {
  console.log('Yay! connected!', PORT)
})

