const yargs = require('yargs')
module.exports = {
  command:'cdn <command>',
  desc:'cdn 相关命令',
  /**@param {yargs} yargs */
  builder(yargs){
    return yargs.commandDir('cdn')
  }
}
