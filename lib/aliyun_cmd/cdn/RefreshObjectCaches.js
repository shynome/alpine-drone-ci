const yargs = require('yargs')
const got = require('got')
const { util:{ env } } = require('../../')
const { genSortQueryStr, genSignature, genCommonParameters } = require('./')

/**
 * @typedef { { files:string[], origin: string } & Aliyun.RequiredArgv } Argv
 */
 
module.exports = {
  command:'RefreshObjectCaches [origin]',
  desc:'cdn 缓存刷新',
  /**@param {yargs} yargs */
  builder(yargs){
    return yargs
    .option('origin',{
      require: true, type: 'string', desc: '例: https://xx.x/yy/zz . 要更新的网站根路径',
      /**@param {string} str */
      coerce: str=>str.replace(/\/$/,'')+'/',
    })
    .option('files',{ 
      require:true, type: 'array', default: [], alias: ['f'],
      desc:'更新的文件, 和 origin 组成文件链接',
      /**@param {string[]} arr */
      coerce:(arr)=>arr.map(f=>f.toString())
    })
  },
  /**@param {Argv} argv */
  async handler(argv){

    argv.AccessKeySecret += '&'
    
    argv.files = argv.files.map(f=>argv.origin+f)
    
    const common_parameters = genCommonParameters(argv.AccessKeyId)
    
    const user_parameters = {
      'Action':     'RefreshObjectCaches',
      'ObjectPath': argv.files.length ? argv.files.join('\n') : argv.origin,
      'ObjectType': argv.files.length ? 'File':'Directory',
    }

    const all_parameters = {
      ...common_parameters,
      ...user_parameters,
    }

    const Signature = genSignature(all_parameters,argv.AccessKeySecret)

    let url = 'https://cdn.aliyuncs.com/?'+[
      genSortQueryStr(user_parameters),
      genSortQueryStr(common_parameters),
      genSortQueryStr({ Signature }),
    ].join('&')
    
    let res, err
    try {
      res = await got(url).then(res=>res.body)
      console.log('请求更新缓存成功, 响应:')
      console.log(res)
    } catch (error) {
      err = error.response.body
      console.log('请求更新缓存失败, 响应:')
      console.log(err)
      return
    }
    
  }
}