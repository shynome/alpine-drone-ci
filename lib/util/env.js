const shell = require('shelljs')

exports.envFilepath = '.env'
require('dotenv').config({ path: exports.envFilepath })

/**
 * 将变量写入 `.env` 文件, 以便共享变量
 * @param {string} name 
 * @param {*} value 
 */
exports.set = (name,value)=>{
  if(!name){
    throw new Error('env name is required')
  }
  shell.echo(`${name}=${JSON.stringify(value)}`).toEnd(`${exports.envFilepath}`)
  process.env[name] = value
  return process.env[name]
}
/**
 * @param {string} name 
 * @param {*} value 
 */
exports.preset = (name,value)=>{
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
exports.get = (name)=>{
  if(!process.env.hasOwnProperty(name)){
    shell.echo(`required env: ${name} `)
    shell.exit(1)
  }
  return process.env[name]
}
