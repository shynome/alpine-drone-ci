const yargs = require('yargs')
const shell = require('shelljs')
const { util:{ env } } = require('./')

/**
 * @typedef {Object} Argv
 * @prop {string} deploy_cmd
 */
module.exports = {
  command:'plugin [deploy_cmd]',
  desc:'drone plugin 模式',
  /**@param {yargs} yargs */
  builder(yargs){
    return yargs
    .option('deploy_cmd',{ default: env.iget('deploy'), require: true, desc: 'deploy <cmd> 其中的 cmd' })
  },
  /**@param {Argv} argv */
  handler(argv){
    if(env.iget('ssh_conf')){
      shell.exec(`deploy ssh set`)
    }
    shell.exec(`deploy ${argv.deploy_cmd}`)
  }
}
