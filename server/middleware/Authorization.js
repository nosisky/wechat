import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();

const key = process.env.secret;


const Authorization = {
  /**
 * @description - Checks if logged in user has valid AUTH token
 *
 * @param {Object} next - Call back function
 *
 * @return {null} - null
 */
  async isLoggedIn(ctx, next) {
    let token;
    let decodedToken;

    const tokenAvailable = ctx.request.headers.authorization ||
      ctx.request.headers['x-access-token'];

    if (ctx.request.headers.authorization) {
      [, token] = ctx.request.headers.authorization.split(' ');
    } else {
      token = tokenAvailable;
    }
    try {
      if (token) {
        jwt.verify(token, key, (error, decoded) => {
          if (error) {
            ctx.status = 401;
            ctx.body = {
              message: 'Failed to Authenticate Token',
            }
            return;
          } else {
            decodedToken = decoded;
          }
        });
      } else {
        ctx.status = 401;
        ctx.body = {
          message: 'Access denied, Authentication token does not exist',
        }
        return;
      }
      ctx.request.decoded = decodedToken;
      await next();
    } catch (error) {
      ctx.throw(500, error)
    }
  },

}

export default Authorization;
