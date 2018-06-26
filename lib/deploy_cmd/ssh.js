const yargs = require('yargs')
module.exports = {
  command:'ssh <command>',
  desc:'ssh 相关命令',
  /**@param {yargs} yargs */
  builder(yargs){
    return yargs.commandDir('ssh')
  }
}
