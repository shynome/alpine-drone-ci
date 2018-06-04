const fs = require('fs')

exports.envFilepath = '.env'
/**
 * @param {string} name 
 * @param {*} default_value 
 */
exports.setEnv = (name,default_value)=>{
  if(process.env[name])return process.env[name]
  fs.appendFileSync(exports.envFilepath,`\n${name}=${JSON.stringify(default_value)}`)
  process.env[name] = default_value
}

// preset env
const { setEnv } = exports

require('dotenv').config({ path: exports.envFilepath })
setEnv('helo','world')
