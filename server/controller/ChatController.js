import database from '../models';
import dotenv from 'dotenv';


dotenv.load();
const secret = process.env.secret;

const { Message, User } = database;

const ChatController = {
  async sendMessage(ctx) {
    const { receiverId, message } = ctx.request.body;
    const senderId = ctx.request.decoded.currentUser.id
    try {
      if (!receiverId || !message) {
        ctx.status = 400;
        ctx.body = {
          message: 'Please input recieverId and message'
        }
        return;
      } else {
        const identifier = `${Math.max(receiverId, senderId)}:${Math.min(receiverId, senderId)}`

        const sentMessage = await Message.create({
          message,
          receiverId,
          senderId,
          identifier
        })
        ctx.status = 201;
        ctx.body = {
          newMessage: sentMessage.dataValues,
          message: 'Message sent successfully!'
        }
      }
    } catch (error) {
      ctx.throw(500, error)
    }
  },

  async getChatHistory(ctx) {
    const receiverId = ctx.params.receiverId;
    const senderId = ctx.request.decoded.currentUser.id;

    const identifier = `${Math.max(Number(receiverId), Number(senderId))}:${Math.min(Number(receiverId), Number(senderId))}`
    console.log(identifier, '======>')
    try {
      ctx.body = await Message
        .findAll({
          where: {
            identifier
          }
        })
    } catch (error) {
      ctx.throw(500, error)
    }
  }
}


export default ChatController;
