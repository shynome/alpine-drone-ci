const shell = require('shelljs')

exports.envFilepath = '.env'
/**
 * @param {string} name 
 * @param {*} default_value 
 * @param {boolean} force 强制覆盖已有的变量
 */
exports.setEnv = (name,default_value,force=false)=>{
  if(!name){
    console.log('env name is required')
  }
  if(!force && process.env[name]){
    return process.env[name]
  }
  shell.exec(`echo '${name}=${JSON.stringify(default_value)}'>>${exports.envFilepath}`)
  process.env[name] = default_value
  return process.env[name]
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
const { setEnv } = exports

require('dotenv').config({ path: exports.envFilepath })
setEnv('build_pack_file','.build_pack_file.tgz')