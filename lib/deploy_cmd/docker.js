const yargs = require('yargs')
module.exports = {
  command:'docker <command>',
  desc:'docker 相关命令',
  /**
   * @param {yargs} yargs 
   */
  builder(yargs){
    return yargs.commandDir('docker')
  }
}
