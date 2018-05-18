# build
- get remote host commit (need environment: `host`, `deploy_dir`)
- pack diff `remote_commit` and `DRONE_COMMIT` to `deploy_pack.tgz`


# deploy
- scp `deploy_pack.tgz` to host `/tmp_file`

# set remote tag
- set remote host commit 