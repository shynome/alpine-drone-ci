const shell = require('shelljs')
const yargs = require('yargs')
const { getEnv, setEnv } = require('../../preset_env')
/**
 * @typedef {Object} Argv
 * @prop {string} host
 */
module.exports = {
  command:'git',
  desc:'git 差异文件构建',
  /**@param {yargs} yargs */
  builder(yargs){
    require
  },
  /** 
   * @param {*} argv 
   */
  handler(argv){
    let [ host, deploy_dir, build_pack_file, ] = ['host','deploy_dir','build_pack_file'].map(getEnv)
    let server_commit = shell.exec(`ssh ${host} cat ${deploy_dir}/.commit.ht`).stdout
    let current_commit = getEnv('DRONE_COMMIT')
    let update_files = shell.exec(`git diff --name-only --diff-filter=ACMRTUXB ${server_commit} ${current_commit} | tr '\n' ' '`).stdout
    let deleted_fiels = shell.exec(`git diff --name-only --diff-filter=D ${server_commit} ${current_commit} | tr '\n' ' '`).stdout
    shell.echo(`pack diff files`)
    shell.exec(`git archive --format=tar.gz -o ${build_pack_file} ${current_commit} ${update_files}`)
    setEnv('deleted_fiels',deleted_fiels)
  }
}
