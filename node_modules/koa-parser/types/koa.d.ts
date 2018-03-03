import * as Koa from 'koa'
import KoaParser from './koa-parser'

declare module 'koa' {
  interface Request {
    body?: KoaParser.Body
  }
}
