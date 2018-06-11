const shell = require('shelljs')
const yargs = require('yargs')
const { getEnv, setEnv } = require('../../preset_env')
yargs.command
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

    let [ build_pack_file, ] = ['build_pack_file'].map(getEnv)

    let { server_commit, current_commit } = argv
    if( ! argv.hasOwnProperty('server_commit') ){
      let [ host, deploy_dir, ] = [ 'host','deploy_dir', ].map(getEnv)
      server_commit = shell.exec(`ssh ${host} cat ${deploy_dir}/.commit.ht`).stdout
    }
    if( ! argv.hasOwnProperty('current_commit') ){
      current_commit = process.env.DRONE_COMMIT || shell.exec(`git log -1 --pretty=format:'%H'`).stdout
    }
    
    let update_files = shell.exec(`git diff --name-only --diff-filter=ACMRTUXB ${server_commit} ${current_commit} | tr '\n' ' '`).stdout
    let deleted_fiels = shell.exec(`git diff --name-only --diff-filter=D ${server_commit} ${current_commit} | tr '\n' ' '`).stdout
    shell.echo(`pack diff files`)
    shell.exec(`git archive --format=tar.gz -o ${build_pack_file} ${current_commit} ${update_files}`)
    setEnv('deleted_fiels',deleted_fiels)
  }
}
