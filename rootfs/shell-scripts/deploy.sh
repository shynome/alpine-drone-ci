#!/bin/sh
/shell-scripts/load_shared_env.sh

remote_cmd_file="/tmp/remote_cmd_file"

echo 'echo execute remote_cmd && \' >> $remote_cmd_file

if [[ -f $packed_file ]];
then
  scp $packed_file $host:$remote_packed_file
  echo "tar -xzvf $remote_packed_file -C $deploy_dir"' && \' >> $remote_cmd_file
fi

if [[ ! w = w$deleted_files ]];
then
  echo "cd $deploy_dir && for f in $deleted_files;"' do rm -f $f && echo "deleted: $f"; done && \' >> $remote_cmd_file
fi

echo "echo deploy finished" >> $remote_cmd_file

ssh $HOST "$(cat $remote_cmd_file)"
