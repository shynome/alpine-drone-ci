const yargs = require('yargs')
const shell = require('shelljs')
const os = require('os')
const { util:{ git, env, drone } } = require('../../')
const fs = require('fs')

/**
 * @param {string} commit
 * @typedef { { [key:string]:string } } Deps
 */
function get_npm_deps_from_commit(commit){
  let content = git.show(commit,'package.json')
  let json = /**@type {{ dependencies:Deps, devDependencies:Deps }}*/(JSON.parse(content))
  let deps = Object.assign( {}, json.dependencies, json.devDependencies )
  let sorted_deps = Object.keys(deps).sort().reduce((t,k)=>( t[k]= deps[k], t ), /**@type {Deps}*/({}))
  return sorted_deps
}

function npm_deps_is_chenged(){
  let [ current_commit_package_json, prev_commit_package_json ] = [ drone.commit_sha, drone.prev_commit_sha ].map(get_npm_deps_from_commit).map(c=>JSON.stringify(c))
  return current_commit_package_json !== prev_commit_package_json
}

/**
 * @typedef {{ build_cmd:string, dist:string, 'install-only':boolean, 'install-cmd': string }} Argv
 */
module.exports = {
  command:'node [build_cmd]',
  desc:'node 项目构建',
  /**@param {yargs} yargs */
  builder(yargs){
    return yargs
    .option('build_cmd',{ default:'build', desc: 'npm 中的打包命令' })
    .option('dist',{ default: 'dist', alias:['d'], desc: '打包后的文件输出目录' })
    .option('install-only',{ default:false, type:'boolean', desc: '只执行 npm install, 不进行打包' })
    .option('install-cmd',{ default:'', type:'string', desc: '替换原来的 npm install 命令', })
  },
  /**@param {Argv} argv  */
  handler(argv){
    // npm run install
    if( !fs.existsSync('node_modules') || npm_deps_is_chenged()){
      shell.exec(argv['install-cmd'] || 'npm i')
    }

    if( argv['install-only'] ){
      return
    }

    // npm run build
    shell.exec(`npm run ${argv.build_cmd}`)
    
    // pack for scp
    shell.exec(`tar -czvf ${env.get('build_pack_file')} ${argv.dist}`)
    shell.exec(`deploy set has_packed 'have string'`)

  }
}
