const shell = require('shelljs')
const yargs = require('yargs')
const { util:{ env } } = require('../../')
/**
 * @typedef {Object} Argv
 * @prop {string} server_commit
 * @prop {string} current_commit
 * @prop {string} git_host
 * @prop {string} git_basedir
 */
module.exports = {
  command:'ssh-git [server_commit] [current_commit]',
  desc:'从 ssh git 仓库差异文件构建',
  /**@param {yargs} yargs */
  builder(yargs){
    return yargs
    .option('git_host',{ require:true, default:process.env.git_host, desc: 'git 仓库服务器' })
    .option('git_basedir',{ require:true, default:process.env.git_basedir, desc: 'git 仓库服务器地址' })
  },
  /**@param {Argv} argv */
  handler(argv){
    
    let [ build_pack_file, ] = [ 'build_pack_file', ].map(env.get)

    function get_server_commit(){
      let [ host, deploy_dir, server_commit_file ] = [ 'host','deploy_dir', 'server_commit_file' ].map(env.get)
      return shell.exec(`ssh ${host} '[[ -f ${server_commit_file} ]] && cat ${server_commit_file} || echo '`).stdout
    }
    
    let { server_commit=get_server_commit(), current_commit=env.get('current_commit') } = argv

    let remote_pack_file = `/tmp/${current_commit}.tgz`
    let remote_cmd = [
      `cd ${argv.git_basedir} && \\`,
      `update_files=$(git diff --name-only --diff-filter=ACMRTUXB ${server_commit} ${current_commit} | tr "\n" " ") && \\`,
      `deleted_files=$(git diff --name-only --diff-filter=D ${server_commit} ${current_commit} | tr "\n" " ") && \\`,
      `[[ w = w$update_files ]] || git archive --format=tar.gz -o ${remote_pack_file} ${current_commit} $update_files" && \\`,
      `echo $update_files && echo $deleted_files`,
    ].join('\n ')
    let [ update_files, deleted_files ] = shell.exec(`ssh ${argv.git_host} '${remote_cmd}'`).stdout.split('\n')

    shell.exec(`deploy set deleted_files '${deleted_files}'`)
    let has_packed = (server_commit && !update_files) ? "" : "have string"
    shell.exec(`deploy set has_packed '${has_packed}'`)
    
    if(has_packed){
      shell.exec(`ssh $host "`)
      shell.exec(`scp $host:${remote_pack_file} ${build_pack_file}`)
    }
  }
}
