#!/bin/sh
/shell-scripts/load_shared_env.sh

[[ w=w$main_host ]] && main_host=$host
ssh $main_host "echo $DRONE_COMMIT>$remote_commit_file"
