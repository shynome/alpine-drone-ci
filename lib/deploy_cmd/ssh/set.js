const yargs = require('yargs')
const fs = require('fs')
const shell = require('shelljs')
const { util:{ env } } = require('./')

/**
 * @typedef {Object} Argv
 * @prop {string} ssh_conf
 * @prop {string} ssh_key
 * @prop {string} private_key_path
 * @prop {string} ssh_dir
 * @prop {string} ssh_config_filepath
 * @prop {string} force
 */
module.exports = {
  command:'set [ssh_conf] [ssh_key]',
  desc:'设置 ssh 相关的配置和密钥',
  /**@param {yargs} yargs */
  builder(yargs){
    let home = env.get('HOME')
    let [ config_filepath, private_key_path, ssh_dir ] = [ 'config', 'id_rsa', '' ].map(f=>`${home}/.ssh/${f}`)
    return yargs
    .option('ssh_conf',{ default: env.iget('ssh_conf'), require: true, desc: 'ssh config file content' })
    .option('ssh_key',{ default: env.iget('ssh_key'), require: true, desc: 'ssh private key' })
    // 以下都是可不填的
    .option('private_key_path',{ default: private_key_path, require: true, desc: 'ssh private key file path' })
    .option('ssh_dir',{ default: ssh_dir, require: true, desc: 'ssh root dir' })
    .option('ssh_config_filepath',{ default: config_filepath, require: true, desc: 'ssh config file path' })
    .option('force',{ default: false, desc: '强行覆盖 ssh config 和 id_rsa 文件' })
  },
  /**@param {Argv} argv */
  handler(argv){
    const { private_key_path, ssh_config_filepath:config_filepath } = argv
    if(fs.existsSync(config_filepath)){
      if(argv.force){
        // shell.echo('强行覆盖 ssh 配置文件, ')
      }else{
        shell.echo('已有 ssh 配置文件, 请在其中修改配置. ')
        return
      }
    }
    shell.mkdir('-p',argv.ssh_dir)
    fs.writeFileSync(config_filepath,argv.ssh_conf)
    fs.writeFileSync(private_key_path,argv.ssh_key)
    shell.chmod(600,private_key_path)
    shell.echo('ssh_conf 和 ssh_key 设置完成')
  }
}
