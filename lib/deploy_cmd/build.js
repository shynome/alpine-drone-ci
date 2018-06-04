const yargs = require('yargs')
module.exports = {
  command:'build <type>',
  desc:'项目构建',
  /**
   * @param {yargs} yargs 
   */
  builder(yargs){
    return yargs.commandDir('build')
  }
}
