const shell = require('shelljs')
const yargs = require('yargs')

/**
 * @typedef {Object} Argv
 * @prop {string[]} _
 * @prop {string} cmd
 * @prop {boolean} silent
 */
module.exports = {
  command:'run <cmd>',
  desc:'执行命令',
  /**@param {yargs} yargs */
  builder(yargs){
    return yargs
    .option('silent',{ type: 'boolean', alias: ['quiet','q'], default: false })
  },
  /** 
   * @param { Argv } argv 
   */
  handler(argv){
    if(argv._.length != 1){
      console.log('cmd sholud a string')
      shell.exec('deploy run -h')
      process.exit(1)
    }
    shell.exec(argv.cmd,{ silent:argv.silent })
  }
}
require('child_process').execSync