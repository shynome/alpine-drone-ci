const shell = require('shelljs')
const fs = require('fs')

exports.envFilepath = '.env'
require('dotenv').config({ path: exports.envFilepath })
/**
 * @template T
 * @param {string} key 
 * @param {(key:string)=>T} func 
 * @returns {T}
 */
const each_name_try_get = (key,func)=>{
  for( let prefix of [ 'PLUGIN_', '' ] ){
    let env_key = prefix+key
    for( let key of [ env_key.toUpperCase(), env_key.toLowerCase(), env_key ] ){
      let res = func(key)
      if(res){ return res }
    }
  }
}
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
    return each_name_try_get(key,(key)=>{
      return key in target
    })
  },
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
  if(!(name in EnvProxy)){
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