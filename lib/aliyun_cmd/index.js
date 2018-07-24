/**
 * 
 * @param {string} AccessKeyId 
 * @param { 'HMAC-SHA1' } SignatureMethod 
 */
exports.genCommonParameters = (AccessKeyId,SignatureMethod='HMAC-SHA1')=>{
  return {
    'Format': 'json',
    'Version': '2014-11-11',
    'AccessKeyId': AccessKeyId,
    'SignatureVersion': '1.0',
    'SignatureMethod': SignatureMethod,
    'SignatureNonce': Math.random().toString().slice(2,15),
    'TimeStamp': new Date().toISOString().replace(/\.\d+Z$/,`Z`),
  }
}

/**
 * 
 * @param {{[key:string]:string}} parameters 
 */
exports.genSortQueryStr = (parameters)=>{
  return Object.keys(parameters).sort().map(k=>`${k}=${encodeURIComponent(parameters[k])}`).join('&')
}