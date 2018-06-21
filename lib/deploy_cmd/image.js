const yargs = require('yargs')
const shell = require('shelljs')
const { util:{ drone, env } } = require('../')

/**
 * @typedef {Object} Argv
 * @prop {string} image
 * @prop {string} host
 * @prop {string} server
 */

module.exports = {
  command:'image [host] [server] [image]',
  desc:'更新服务镜像',
  /**@param {yargs} yargs */
  builder(yargs){
    return yargs
    .option('host',{ require:true, type: 'string', default: process.env.host || process.env.HOST, desc:'docker node manager' })
    .option('image',{ require:true, type: 'string', default: process.env.image || process.env.IMAGE, desc:'newer image' })
    .option('server',{ require:true, type:'string', default: process.env.server || process.env.SERVER, desc: 'update server' })
  },
  /**@param {Argv} argv */
  async handler(argv){
    shell.exec(`ssh ${argv.host} 'docker service update --with-registry-auth --image ${argv.image} ${argv.server}'`)
  }
}