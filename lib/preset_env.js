const shell = require('shelljs')

exports.envFilepath = '.env'
/**
 * 将变量写入 `.env` 文件, 以便共享变量
 * @param {string} name 
 * @param {*} value 
 */
exports.setEnv = (name,value)=>{
  if(!name){
    throw new Error('env name is required')
  }
  shell.exec(`echo '${name}=${JSON.stringify(value)}'>>${exports.envFilepath}`)
  process.env[name] = value
  return process.env[name]
}
/**
 * @param {string} name 
 * @param {*} value 
 */
exports.presetEnv = (name,value)=>{
  if(process.env[name])return 
  if(typeof value === 'function'){
    Object.defineProperty(process.env,name,{ get:value })
  }else{
    process.env[name] = value
  } 
}

/**
 * @param {string} name 
 * @returns {string}
 */
exports.getEnv = (name)=>{
  let value = process.env[name]
  if(!value){
    shell.echo(`required env: ${name} `)
    shell.exit(1)
  }
  return value
}

// preset env
const { setEnv, getEnv, presetEnv } = exports

require('dotenv').config({ path: exports.envFilepath })

presetEnv('build_pack_file','build_pack_file.tgz')

presetEnv('current_commit',()=>(process.env.DRONE_COMMIT || shell.exec(`git log -1 --pretty=format:'%H'`).stdout))

presetEnv('server_commit_file',()=>`${getEnv('deploy_dir')}/.commit.ht`)
