#!/bin/sh
/shell-scripts/load_shared_env.sh

# check required environment
[[ w=w$host ]] && echo 'must set host environment' && exit 1
[[ w=w$deploy_dir ]] && echo 'must set deploy_dir environment' && exit 1

remote_commit_file="$deploy_dir/.commit.ht"
remote_commit=$(ssh $host "[[ -f $remote_commit_file]] && cat $remote_commit_file || echo ''")
new_files=$(git diff --diff-filter=ACMRTUXB --name-only $remote_commit $DRONE_COMMIT | tr '\n' ' ')
deleted_files=$(git diff --diff-filter=D --name-only $remote_commit $DRONE_COMMIT | tr '\n' ' ')

[[ ! w=w$new_files ]] && git archive --format=tar.gz -o $packed_file $DRONE_COMMIT $new_files
echo "deleted_files=$deleted_files" >> shared_env
