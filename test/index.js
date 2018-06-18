require('../lib/util/overwrite_shelljs')
const shell = require('shelljs')
shell.config.fatal = true
shell.config.silent = true

const path = require('path')
const fs = require('fs')

describe('',()=>{
  let tmpdir = ''
  before(async()=>{
    tmpdir = fs.mkdtempSync('/tmp/')
    // @ts-ignore
    let pkg_filepath=require.resolve('../package'), bins = /**@type {{[k:string]:string}} */(require(pkg_filepath).bin)
    let pkg_basedir = path.dirname(pkg_filepath)
    for( let name of Object.keys(bins) ){
      let bin = path.join(pkg_basedir,bins[name])
      shell.ln('-s',bin,path.join(tmpdir,name))
    }
    process.env.PATH = tmpdir+':'+process.env.PATH
  })
  it('deploy link test',()=>{
    shell.exec(`deploy -v`,{ silent:true })
  })
  require('./cmd-cli')
  after(async()=>{
    shell.rm('-rf',tmpdir)
  })
})
