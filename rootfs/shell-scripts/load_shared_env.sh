#!/bin/sh
set -e
[[ ! -f ./deploy_env ]] && cp /shell-scripts/shared_env.conf /shared_env
source ./deploy_env