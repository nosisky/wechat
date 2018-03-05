// This little utility helps you render HTML without any engine in Koa
// use: var render = require('...pathToThisFile')
// function *(){ this.body = yield render(__dirname + '..pathToHTMLfile')}

var fs = require('fs')

const renderFile = (src) => {
  return new Promise(function (resolve, reject) {
    fs.readFile(src, { 'encoding': 'utf8' }, function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export default renderFile;
