
/**
 * init yargs command dir
 * @param {string} command_dir 
 */
exports.init = (command_dir)=>
require('yargs').commandDir(command_dir)
.alias('h','help')
.alias('v','version')
.demandCommand(1)
.help()
.argv

require('./overwrite_shelljs')

require('./preset_env')
exports.drone = require('./drone').drone

exports.util = require('./util')