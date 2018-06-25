const yargs = require('yargs')
const shell = require('shelljs')
const { util:{ env } } = require('./')

/**
 * @typedef {Object} Argv
 * @prop {string} action
 */
module.exports = {
  command:'plugin [action]',
  desc:'drone plugin 模式',
  /**@param {yargs} yargs */
  builder(yargs){
    return yargs
    .option('action',{ default: env.get('action') })
  },
  /**@param {Argv} argv */
  handler(argv){
    shell.exec(`deploy ${argv.action}`)
  }
}
