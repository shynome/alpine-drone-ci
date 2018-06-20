/// <reference path="../../node_modules/@shynome/dingtalk/types/dingtalk/index.d.ts" />
const yargs = require('yargs')
const { util:{ drone } } = require('../')
const { Bot } = require('@shynome/dingtalk')

/**
 * @typedef {Object} Argv
 * @prop {string} report_hook
 * @prop {boolean} all
 * @prop {string} timeZone
 * @prop {string} locale
 */

module.exports = {
  command:'report [report_hook]',
  desc:'向指定 web_hook 发送构建结果',
  /**@param {yargs} yargs */
  builder(yargs){
    return yargs
    .option('all',{ default: 'false', alias:['a','always'], type: 'boolean', desc:'不论成功或失败都发送通知' })
    .option('report_hook',{ default: process.env.REPORT_HOOK, required: true, type: 'string', desc:'web hook url , 默认是环境变量: process.env.REPORT_HOOK' })
    .option('timeZone',{ alias: [ 't' ], type:'string', default: 'Asia/Shanghai' })
    .option('locale',{ alias: [ 'l' ], type:'string', default: 'chinese' })
  },
  /**@param {Argv} argv */
  async handler(argv){
    // process.env.DRONE_BUILD_STATUS = Math.random()<0.5?'failure':'success'
    switch (true) {
      default: 
        return //exit
      case argv.all: 
        break //continue
      case drone.BUILD_STATUS==='failure': 
        break //continue
      case drone.BUILD_STATUS==='success': 
        return //exit
    }
    const bot = new Bot(argv.report_hook)
    let formatTime = (time='')=>new Date(Number(time)*1000).toLocaleString(argv.locale,{ timeZone:argv.timeZone })
    let result = await bot.send({
      msgtype: 'markdown',
        markdown:{
        title: `${drone.REPO_NAME} ${drone.BUILD_NUMBER} ${drone.BUILD_STATUS==='success'?'ok':'fail'}`,
        text:[
          `**REPO**: [${drone.REPO}](${drone.REPO_LINK})`,
          `**RESULT**:  [ ${drone.COMMIT_AUTHOR} - ${drone.BUILD_EVENT} - ${drone.BUILD_NUMBER} - ${drone.BUILD_STATUS} ](${drone.BUILD_LINK})`,
          `**COMMIT**: [ ${drone.COMMIT_BRANCH} - ${drone.COMMIT_SHA.slice(0,10)}](${drone.COMMIT_LINK})`,
          `**MESSAGE**: ${drone.COMMIT_MESSAGE}`,
          `**CREATE**: ${formatTime(drone.BUILD_CREATED)}`,
          `**START**: ${formatTime(drone.BUILD_STARTED)}`,
          `**FINISHED**: ${formatTime(drone.BUILD_FINISHED)}`,
        ].join('    \n')
      }
    })
    console.log(`send result: ${JSON.stringify(result.body)}`)
  }
}