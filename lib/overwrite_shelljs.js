const shell = require('shelljs')
shell.config.fatal = true
shell.config
exports.originShellExec = shell.exec
shell.exec = function(){
  console.log(`+ ${JSON.stringify(arguments[0])}`)
  let result = exports.originShellExec.apply(this,arguments)
  result.stdout = result.stdout.replace(/\n$/,'')
  return result
}