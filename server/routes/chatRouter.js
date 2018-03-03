import Koa from 'koa';

import Router from 'koa-router';

import ChatController from '../controller/ChatController';
import Validator from '../middleware/Validator';
import Authorization from '../middleware/Authorization';


const { sendMessage, getChatHistory } = ChatController;
const { isLoggedIn } = Authorization;


const chatRouter = new Router();

const apiPrefix = '/api/v1';

chatRouter.post(`${apiPrefix}/chat`, isLoggedIn, sendMessage)
chatRouter.get(`${apiPrefix}/chat/:receiverId`, isLoggedIn, getChatHistory)

export default chatRouter;
