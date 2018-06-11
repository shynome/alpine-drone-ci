const shell = require('shelljs')
const yargs = require('yargs')
const { setEnv } = require('../preset_env')

module.exports = {
  command:'set <name> <value>',
  desc:'在 .env 设置共享变量, 容器里的 environment 优先级更高',
  /** 
   * @param {{name:string,value:*}} argv 
   */
  handler(argv){
    setEnv(argv.name,argv.value)
  }
}
