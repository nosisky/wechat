import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';

import database from '../models';

const Op = Sequelize.Op;

const { User } = database;

const Validator = {

  async checkInput(ctx, next) {
    let { username, email, password } = ctx.request.body;

    if (!username || username.length < 4 || !/\w/.test(username)) {
      ctx.throw(400, JSON.stringify({
        'message': 'Invalid username supplied, minimum of 4 characters'
      }))
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      ctx.throw(400, JSON.stringify({
        message: 'Invalid email supplied'
      }))
    }
    if (!password || password.length < 5) {
      ctx.throw(400, JSON.stringify({
        message:
          'Invalid password supplied, minimum of 5 characters'
      }))
    }
    username = username.toLowerCase();

    const user = await User.find({
      where: {
        [Op.or]: [{ email },
        { username }]
      }
    })

    if (user) {
      if (user.dataValues.email === email) {
        ctx.throw(409, JSON.stringify({
          message: 'Email already exist'
        }))
      }

      else {
        if (user.dataValues.username === username) {
          ctx.throw(409, JSON.stringify({
            message: 'Username already exist'
          }))
        }
      }
    }
    else {
      const _password = bcrypt.hashSync(password, 10);

      ctx.request.userInput = {
        username,
        email,
        password: _password
      }
      await next();
    }
  }
}

export default Validator;
