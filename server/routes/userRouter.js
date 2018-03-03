import Koa from 'koa';

import Router from 'koa-router';

import UserController from '../controller/UserController';
import Validator from '../middleware/Validator';

const { create, login } = UserController;
const { checkInput } = Validator;


const userRouter = new Router();

const apiPrefix = '/api/v1/users';

userRouter.post(`${apiPrefix}/signup`, checkInput, create)
userRouter.post(`${apiPrefix}/signin`, login)

userRouter.get('/', (ctx) => {
  ctx.response.body = {
    message: 'Welcome to the API'
  }
})



export default userRouter;
