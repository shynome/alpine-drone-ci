const shell = require('shelljs')
const yargs = require('yargs')
const { getEnv, setEnv } = require('../../preset_env')
/**
 * @typedef {Object} Argv
 * @prop {string} server_commit
 * @prop {string} current_commit
 */
module.exports = {
  command:'git [server_commit] [current_commit]',
  desc:'git 差异文件构建',
  /** 
   * @param {Argv} argv 
   */
  handler(argv){

    let [ build_pack_file, server_commit_file ] = [ 'build_pack_file', 'server_commit_file' ].map(getEnv)

    function get_server_commit(){
      let [ host, deploy_dir, ] = [ 'host','deploy_dir', ].map(getEnv)
      return shell.exec(`ssh ${host} '[[ -f ${server_commit_file} ]] && cat ${server_commit_file} || echo '`).stdout
    }
    
    let { server_commit=get_server_commit(), current_commit=getEnv('current_commit') } = argv

    let update_files = shell.exec(`git diff --name-only --diff-filter=ACMRTUXB ${server_commit} ${current_commit} | tr '\n' ' '`).stdout
    let deleted_files = shell.exec(`git diff --name-only --diff-filter=D ${server_commit} ${current_commit} | tr '\n' ' '`).stdout

    setEnv('deleted_files',deleted_files)
    let has_packed = (server_commit && !update_files) ? "" : "have string"
    setEnv('has_packed',has_packed)
    
    if(has_packed){
      shell.exec(`git archive --format=tar.gz -o ${build_pack_file} ${current_commit} ${update_files}`)
    }
  }
}
