const fs = require('fs')
const shell = require('shelljs')

module.exports = class EmptyGitDir {
  constructor(cwd=process.cwd()){
    this.cwd = cwd
    this.tmpdir = fs.mkdtempSync('/tmp/')
    shell.exec([
      `cd '${this.tmpdir}'`,
      `git init .`,
      `echo "build_pack_file.tgz\n.*"> .gitignore`,
      `git config user.name 'x'`,
      `git config user.email 'x@x.com'`,
      `deploy set host test-deploy`,
      `deploy set deploy_dir '${this.tmpdir}'`,
      `deploy run 'ssh $host "rm -rf ${this.tmpdir} && mkdir ${this.tmpdir}"'`,
    ].join('&& \\\n'))
  }
  chdir(){
    process.chdir(this.tmpdir)
  }
  exit(){
    shell.exec(`deploy run 'ssh $host "rm -rf ${this.tmpdir}"'`)
    process.chdir(this.cwd)
    shell.rm('-rf',this.tmpdir)
  }
}
