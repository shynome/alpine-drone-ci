#!/bin/sh
ssh $main_host "echo $DRONE_COMMIT>$remote_commit_file"