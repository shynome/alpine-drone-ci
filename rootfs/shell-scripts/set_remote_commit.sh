#!/bin/sh
[[ w=w$main_host ]] && main_host=$host
ssh $main_host "echo $DRONE_COMMIT>$remote_commit_file"
