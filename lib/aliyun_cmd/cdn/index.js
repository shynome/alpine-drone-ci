
const crypto = require('crypto')

const { genSortQueryStr } = require('../')

/**
 * @param { {[key:string]:string} } parameters
 * @param { string } key
 * @returns {string}
 */
const genSignature = (parameters,key)=>{
  let query_str = `GET&${encodeURIComponent('/')}&`+encodeURIComponent(genSortQueryStr(parameters))
  let Signature = crypto.createHmac('sha1',key).update(query_str).digest('base64')
  return Signature
}

module.exports = {
  ...require('../'),
  genSignature,
}