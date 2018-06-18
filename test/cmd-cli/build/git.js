const fs = require('fs')
const assert = require('assert')
const shell = require('shelljs')
const { EmptyGitDir } = require('../../utils')
let ls_filter_list = ['.commit.ht','.','..']

describe('build git',()=>{

  let repo = new EmptyGitDir()
  before(async()=>{
    repo.chdir()
    // shell.exec('deploy set deploy_exec_quiet 1')
    shell.config.silent = false
  })

  it('add file ',async ()=>{

    let files = 'ab'.split('')
    let content = '666'
    for(let f of files){
      shell.exec(`echo '${content}'>${f}`)
    }
    shell.exec(`git add ${files.join(' ')} && git commit -m 'first commit'`)
    shell.exec(`deploy build git`)
    shell.exec(`deploy run 'deploy to $host'`)
    // check
    for(let f of files){
      assert.equal(
        shell.exec(`deploy run 'ssh $host "cat ${repo.tmpdir}/${f}"'`).stdout,
        '666'
      )
    }
  })

  it('remove file',async()=>{
    let files = 'b'.split('')
    for(let f of files){
      shell.exec(`rm -rf ${f}`)
    }
    shell.exec(`git add b && git commit -m 'remove files'`)
    shell.exec(`deploy build git`)
    shell.exec(`deploy run 'deploy to $host'`)

    // check
    assert.equal(
      shell.exec(`deploy run 'ssh $host "[[ -f ${repo.tmpdir}/b ]] && echo 1 || echo 0"'`).stdout,
      '0'
    )

  })

  it('change file',async()=>{

    let content = '777'
    shell.exec(`echo '${content}'>a`)
    shell.exec(`git add a && git commit -m 'first commit'`)
    shell.exec(`deploy build git`)
    shell.exec(`deploy run 'deploy to $host'`)

    // check
    assert.equal(
      shell.exec(`deploy run 'ssh $host "cat ${repo.tmpdir}/a"'`).stdout,
      content
    )

  })
  
  after(async()=>{
    repo.exit()
  })
})