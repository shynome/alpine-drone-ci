const shell = require('shelljs')
/**
 * @typedef {Object} Argv
 * @prop {string} host
 */
module.exports = {
  command:'to <host>',
  desc:'部署到主机',
  /** 
   * @param {Argv} argv 
   */
  handler(argv){
    shell.exec('')
    shell.exec(
      [
        `ssh ${argv.host} echo ''`,
      ].join('&& \\')
    )
  }
}
