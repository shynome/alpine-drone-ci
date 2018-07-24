const yargs = require('yargs')
const got = require('got')
const { util:{ env } } = require('../../')
const { genSortQueryStr, genSignature, genCommonParameters } = require('./')

/**
 * @typedef { { id:string } & Aliyun.RequiredArgv } Argv
 */
 
module.exports = {
  command:'DescribeRefreshTasks [id]',
  desc:'查看',
  /**@param {yargs} yargs */
  builder(yargs){
    return yargs
    .option('id',{
      require: true, type: 'string', desc: '查询指定 taskId 的刷新状态',
    })
  },
  /**@param {Argv} argv */
  async handler(argv){
    
  }
}