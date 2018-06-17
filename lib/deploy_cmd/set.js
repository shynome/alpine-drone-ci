const shell = require('shelljs')
const yargs = require('yargs')
const { util:{ env } } = require('../')

module.exports = {
  command:'set <name> <value>',
  desc:'在 .env 设置共享变量, 优先级最高',
  /**@param {yargs} yargs*/
  builder(yargs){
    return yargs
    .option('name',{ require:true, type: 'string' })
    .option('value',{ require:true, })
  },
  /**@param {{name:string,value:*}} argv  */
  handler(argv){
    env.set(argv.name,argv.value)
  }
}
