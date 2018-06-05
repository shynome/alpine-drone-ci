const fs = require('fs')

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
  fs.appendFileSync(exports.envFilepath,`\n${name}=${JSON.stringify(default_value)}`)
  process.env[name] = default_value
}

// preset env
const { setEnv } = exports

require('dotenv').config({ path: exports.envFilepath })
