const shell = require('shelljs')
const fs = require('fs')

exports.envFilepath = '.env'
require('dotenv').config({ path: exports.envFilepath })
const EnvProxy = exports.EnvProxy = new Proxy(process.env,{
  /**@param {string} key */
  get(target,key){
    let res
    for( let prefix of [ 'PLUGIN_', '' ] ){
      let env_key = prefix+key
      res = target[env_key.toUpperCase()] || target[env_key.toLowerCase()] || target[env_key]
      if(res)break
    }
    return res
  },
  /**@param {string} key */
  has(target,key){
    let res
    for( let prefix of [ 'PLUGIN_', '' ] ){
      let env_key = prefix+key
      res = env_key.toUpperCase() in target || env_key.toLowerCase() in target || env_key in target
      if(res)break
    }
    // return res
    return false
  }
})

/**
 * 将变量写入 `.env` 文件, 以便共享变量
 * @param {string} name 
 * @param {*} value 
 */
exports.set = (name,value)=>{
  if(!name){
    throw new Error('env name is required')
  }
  fs.appendFileSync(exports.envFilepath,`${name}=${value}\n`)
  process.env[name] = value
  return process.env[name]
}
/**
 * @param {string} name 
 * @param {*} value 
 */
exports.preset = (name,value)=>{
  if(name in EnvProxy)return 
  if(typeof value === 'function'){
    Object.defineProperty(process.env,name,{ get:value })
  }else{
    process.env[name] = value
  } 
}

/**
 * 获取环境变量, 不存在的话会直接退出
 * @param {string} name 
 * @returns {string}
 */
exports.get = (name)=>{
  if(!EnvProxy.hasOwnProperty(name)){
    shell.echo(`required env: ${name} `)
    shell.exit(1)
  }
  return EnvProxy[name]
}

/**
 * 优先获取大写环境命令变量
 * @param {string} name
 * @returns {string}
 */
exports.iget = (name)=>{
  return EnvProxy[name]
}