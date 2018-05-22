#!/bin/sh
/shell-scripts/load_shared_env.sh

# check required environment
[[ w=w$host ]] && echo 'env host required' && exit 1
[[ w=w$deploy_dir ]] && echo 'env host required' && exit 1

remote_commit=$(ssh $host "[[ -f $remote_commit_file]] && cat $remote_commit_file || echo ''")
echo "if you do not set main_host, main_host will usr host value" && echo "main_host=$([[ w=w$main_host ]] && echo $host || echo $main_host)">>shared_env
new_files=$(git diff --diff-filter=ACMRTUXB --name-only $remote_commit $DRONE_COMMIT | tr '\n' ' ')
deleted_files=$(git diff --diff-filter=D --name-only $remote_commit $DRONE_COMMIT | tr '\n' ' ')

[[ ! w=w$new_files ]] && git archive --format=tar.gz -o $packed_file $DRONE_COMMIT $new_files
echo "deleted_files=$deleted_files" >> shared_env
