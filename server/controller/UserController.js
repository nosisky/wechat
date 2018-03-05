import database from '../models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import omit from 'lodash/omit';

dotenv.load();
const secret = process.env.secret;

const { User } = database;


const UserController = {

  /**
   * @description - Creates a new user in the database
   * 
   * @param {any} ctx - context object
   */
  async create(ctx) {
    try {

      const user = await User.create(ctx.request.userInput)

      const currentUser = omit(
        user.dataValues,
        ['password', 'createdAt', 'updatedAt']
      );

      const token = jwt.sign(
        {
          currentUser,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
        },
        secret
      );
      ctx.status = 201;
      ctx.body = {
        token,
        message: 'Signup successful'
      }
    } catch (err) {
      ctx.throw(500, err)
    }
  },

  /**
   * @description - Logs users into the application
   * 
   * @param {Object} ctx - context object
   */
  async login(ctx) {
    let { username, password } = await ctx.request.body;

    try {
      if (!username || !password) {
        ctx.throw(400, JSON.stringify({
          message: 'Invalid credentials'
        }))
      } else {
        const _username = username.toLowerCase();
        const user = await User.findOne({
          where: {
            username: _username
          }
        })

        if (user && bcrypt.compareSync(password, user.dataValues.password)) {
          const currentUser = omit(
            user.dataValues,
            ['password', 'createdAt', 'updatedAt']
          );
          const token = jwt.sign(
            {
              currentUser,
              exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
            },
            secret
          );
          ctx.body = {
            token,
            message: 'Logged in successfully'
          }
        } else {
          ctx.throw(400, JSON.stringify({
            message: 'Invalid credentials supplied'
          }))
        }
      }
    } catch (err) {
      ctx.throw(500, err)
    }
  }
}

export default UserController;
