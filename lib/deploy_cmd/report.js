const yargs = require('yargs')
/**
 * @typedef {Object} Argv
 */
module.exports = {
  command:'report <hook_url> [x]',
  desc:'向指定 web_hook 发送构建结果',
  /**
   * @param {yargs} yargs 
   */
  builder(yargs){
    return yargs
    .option('x',{ default: 'xxxxx' })
  },
  /**@param {Argv} argv */
  handler(argv){
    console.log(argv)
  }
}
