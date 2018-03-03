declare namespace KoaParser {
  interface Options {
    readonly encoding?: string
    readonly error?: (err: any, ctx: any) => void
    json?: string | string[]
    multipart?: string | string[]
    text?: string | string[]
    urlencoded?: string | string[]
  }

  interface Body {
    [key: string]: any
  }

  interface ParserOptions {
    encoding?: string
    [key: string]: any
  }
}

export default KoaParser
