const shell = require('shelljs')
shell.config.fatal = true
shell.config
exports.originShellExec = shell.exec
/**输出是否要补换行符 */
let newline = ''
const newline_regular = /\n$/
shell.exec = function(){
  shell.echo(`${newline}+ ${JSON.stringify(arguments[0])}`)
  let result = exports.originShellExec.apply(this,arguments)
  if( newline_regular.test(result) ){
    result.stdout = result.stdout.replace(newline_regular,'')
    newline = ''
  }else{
    newline = '\n'
  }
  return result
}