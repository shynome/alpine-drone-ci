const shell = require('shelljs')
const yargs = require('yargs')

module.exports = {
  command:'run <cmd>',
  desc:'执行命令',
  /**@param {yargs} yargs */
  builder(yargs){
    return yargs.example(`deploy run 'echo 6'`,``)
  },
  /** 
   * @param {{_:string[], cmd:string}} argv 
   */
  handler(argv){
    if(argv._.length != 1){
      console.log('cmd sholud a string')
      shell.exec('deploy run -h')
      process.exit(1)
    }
    shell.exec(argv.cmd)
  }
}
require('child_process').execSync