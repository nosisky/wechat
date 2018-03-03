import Koa from 'koa';
import bodyParser from 'koa-parser';
import Router from 'koa-router';
import convert from 'koa-convert';
import koaRes from 'koa-res';

import userRouter from './server/routes/userRouter';
import chatRouter from './server/routes/chatRouter';

const server = new Koa();

const PORT = 3000 || process.env.PORT;

// const router = new Router();

server.use(bodyParser());

// format response as JSON

server.use(userRouter.routes())
server.use(chatRouter.routes())

server.listen(PORT, () => {
  console.log('Yay! connected!', PORT)
})
