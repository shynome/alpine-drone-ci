const shell = require('shelljs')

module.exports = {

  /**
   * @param {string} commit 
   * @param {string} file 
   */
  show(commit,file){
    return shell.exec(`git show ${commit}:${file}`,{ silent: true }).toString()
  }
}