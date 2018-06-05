
/**
 * init yargs command dir
 * @param {string} command_dir 
 */
exports.init = (command_dir)=>
require('yargs').commandDir(command_dir)
.alias('h','help')
.alias('v','version')
.demandCommand(1)
.help()
.argv

const shell = require('shelljs')
shell.config.fatal = true
shell.config
exports.originShellExec = shell.exec
shell.exec = function(){
  shell.echo('+',arguments[0])
  return exports.originShellExec.apply(this,arguments)
}

require('./preset_env')