const shell = require('shelljs')

// preset env
const { set, get, preset } = require('./util/env')

preset('build_pack_file','build_pack_file.tgz')

preset('current_commit',()=>(process.env.DRONE_COMMIT || shell.exec(`git log -1 --pretty=format:'%H'`).stdout))

preset('server_commit_file',()=>`${get('deploy_dir')}/.commit.ht`)

