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
  command:'to [host] [server] [image]',
  desc:'更新 stack 服务镜像',
  /**@param {yargs} yargs */
  builder(yargs){
    return yargs
    .option('host',{ require:true, type: 'string', default: env.iget('host'), desc:'docker node manager' })
    .option('image',{ require:true, type: 'string', default: env.iget('image'), desc:'docker image name' })
    .option('server',{ require:true, type:'string', default: env.iget('server'), desc: 'need update server' })
  },
  /**@param {Argv} argv */
  async handler(argv){
    shell.echo('更新时间会比较长, 请耐心等待')
    shell.exec(`time ssh ${argv.host} 'docker service update -q --with-registry-auth --update-parallelism=0 --update-order="start-first" --update-failure-action=rollback --update-max-failure-ratio=1 --image ${argv.image} ${argv.server}'`)
  }
}