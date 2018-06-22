const shell = require('shelljs')
const fs = require('fs')
const yargs = require('yargs')
const { util:{ env,drone } } = require('../../')
/**
 * @typedef {Object} Argv
 * @prop {string} dockerfile
 * @prop {string} context
 * @prop {string} tags
 * @prop {string} registry
 * @prop {string} repo
 */

module.exports = {
  command:'publish',
  desc:'发布 docker 镜像',
  /**@param {yargs} yargs */
  builder(yargs){

    function getTags(){
      switch(true){
        case !!env.iget('tags'):
          return env.iget('tags')
        case fs.existsSync('.tags'):
          return fs.readFileSync('.tags','utf-8').replace(/\s$/,'')
        default:
          return [ drone.commit_sha  ].concat(drone.commit_branch === 'master'?'latest':'dev').join(',')
      }
    }
    
    return yargs
    .option('dockerfile',{ require:true, type:'string', default: env.iget('dockerfile') || 'Dockerfile', desc: 'dockerfile path' })
    .option('context',{ require:true, type:'string', default:env.iget('context') || '.', desc: 'dockerfile path' })
    .option('tags',{ require:true, type:'string', default: getTags(), desc: 'dockerfile path' })
    .option('repo',{ require:true, type:'string', default: env.iget('repo') || drone.repo_name, desc: 'repo name' })
    .option('registry',{ type:'string', default: env.iget('registry'), desc: 'docker registry' })
  },
  /**@param {Argv} argv */
  handler(argv){
    [ 'DOCKER_USERNAME', 'DOCKER_PASSWORD' ].map(env.get)
    shell.exec(`docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD ${argv.registry}`)
    let sha256 = shell.exec(`docker build ${argv.context} -q -f ${argv.dockerfile}`).stdout
    let tags = argv.tags.split(',')
    for(let tag of tags){
      let image_name = `${argv.repo}:${tag}`
      shell.exec(`docker tag ${sha256} ${image_name}`)
      shell.exec(`docker push ${image_name}`)
    }
  }
}

