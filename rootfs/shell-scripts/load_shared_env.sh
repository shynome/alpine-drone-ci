#!/bin/sh
set -e
[[ ! -f ./shared_env ]] && cp /shell-scripts/shared_env.conf shared_env
source ./shared_env
