const shell = require('shelljs')
const yargs = require('yargs')
const { getEnv } = require('../preset_env')
/**
 * @typedef {Object} Argv
 * @prop {string} host
 */
module.exports = {
  command:'to <host>',
  desc:'部署到主机',
  /** 
   * @param {Argv} argv 
   */
  handler(argv){
    let [ build_pack_file, deploy_dir, has_packed, deleted_files, current_commit ] = [ 'build_pack_file', 'deploy_dir', 'has_packed', 'deleted_files', 'current_commit' ].map(getEnv)

    let tmp_file = `/tmp/${getEnv('current_commit')}.tgz`
    
    if(has_packed){
      shell.exec(`scp ${build_pack_file} ${argv.host}:${tmp_file}`)
    }

    let remote_cmd=[
      has_packed && `tar -xzvf ${tmp_file} -C ${deploy_dir} && \\`,
      deleted_files && `cd '${deploy_dir}' && for f in ${deleted_files}; do rm -f \\$f && echo 删除: \\$f; done && \\`,
      `echo '${current_commit}'>${deploy_dir}/.commit.ht`
    ]
    // 过滤掉没必要的步骤
    remote_cmd = remote_cmd.filter(n=>n)
    shell.exec(`ssh ${argv.host} "${remote_cmd.join('\n ')}"`)
  }
}
