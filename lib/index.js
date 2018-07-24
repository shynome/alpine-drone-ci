exports.util = require('./util')

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


require('./preset_env')
