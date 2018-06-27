/// <reference path="../../node_modules/@shynome/dingtalk/types/dingtalk/index.d.ts" />
const yargs = require('yargs')
const { util:{ drone, env } } = require('../')
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
    .option('report_hook',{ default: env.iget('report_hook'), required: true, type: 'string', desc:'web hook url , 默认是环境变量: process.env.REPORT_HOOK' })
    .option('timeZone',{ alias: [ 't' ], type:'string', default: 'Asia/Shanghai' })
    .option('locale',{ alias: [ 'l' ], type:'string', default: 'chinese' })
  },
  /**@param {Argv} argv */
  async handler(argv){
    switch (true) {
      default: 
        return //exit
      case argv.all: 
        break //continue
      case drone.build_status==='failure': 
        break //continue
      case drone.build_status==='success': 
        console.log(`report build only when build failure`)
        return //exit
    }
    const bot = new Bot(argv.report_hook)
    let formatTime = (time='')=>new Date(Number(time)*1000).toLocaleString(argv.locale,{ timeZone:argv.timeZone })
    let result = await bot.send({
      msgtype: 'markdown',
        markdown:{
        title: `${drone.repo_name} ${drone.build_number} ${drone.build_status==='success'?'ok':'fail'}`,
        text:[
          `**REPO**: [${drone.repo}](${drone.repo_link})`,
          `**RESULT**:  [ ${drone.commit_author} - ${drone.build_event} - ${drone.build_number} - ${drone.build_status} ](${drone.build_link})`,
          `**COMMIT**: [ ${drone.commit_branch} - ${drone.commit_sha.slice(0,10)}](${drone.commit_link})`,
          `**MESSAGE**: ${drone.commit_message}`,
          `**CREATE**: ${formatTime(drone.build_created)}`,
          `**START**: ${formatTime(drone.build_started)}`,
          `**FINISHED**: ${formatTime(drone.build_finished)}`,
        ].join('    \n')
      }
    })
    console.log(`send result: ${JSON.stringify(result.body)}`)
  }
}