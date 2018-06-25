const shell = require('shelljs')
const { env:{ get } } = require('./')
shell.config.fatal = true
shell.config.silent = get('deploy_exec_quiet') ? true : false
exports.originShellExec = shell.exec
/**输出是否要补换行符 */
let newline = ''
const newline_regular = /\n$/
shell.exec = function(){
  let quiet = shell.config.silent
  if( arguments[1] && typeof arguments[1] === 'object' && 'silent' in arguments[1] ){
    quiet = arguments[1].silent
  }
  if(!quiet){
    shell.echo(`${newline}+ ${JSON.stringify(arguments[0])}`)
  }
  let result = exports.originShellExec.apply(this,arguments)
  if( newline_regular.test(result) ){
    result.stdout = result.stdout.replace(newline_regular,'')
    newline = ''
  }else{
    newline = '\n'
  }
  return result
}