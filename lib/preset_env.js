const shell = require('shelljs')

// preset env
const { util:{ drone, env:{ preset, get } } } = require('./')

preset('build_pack_file',process.cwd()+'/build_pack_file.tgz')

preset('deleted_files','')

preset('current_commit',()=>(drone.commit || shell.exec(`git log -1 --pretty=format:'%H'`).stdout))

preset('server_commit_file',()=>`${get('deploy_dir')}/.commit.ht`)

