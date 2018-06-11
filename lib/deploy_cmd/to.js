const shell = require('shelljs')
const yargs = require('yargs')
/**
 * @typedef {Object} Argv
 * @prop {string} host
 * @prop {string} build_pack_file
 */
module.exports = {
  command:'to <host>',
  desc:'部署到主机',
  /**@param {yargs} yargs */
  builder(yargs){
    return yargs
    .option('build_pack_file',{ default: process.env.build_pack_file })
  },
  /** 
   * @param {Argv} argv 
   */
  handler(argv){
    let { } = process.env
    // shell.exec(`scp ${process.env.build_pack_file} ${argv.host}:${process.env.temote}`)
    shell.exec([
      `ssh ${argv.host} echo 'hello' && \\`,
      `echo 77`
    ].join('\n '))
  }
}
