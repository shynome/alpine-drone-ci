#!/bin/sh
set -e
[[ ! -f ./sahred_env ]] && cp /shell-scripts/shared_env.conf shared_env
source ./deploy_env
