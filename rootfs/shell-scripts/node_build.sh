#!/bin/sh
/shell-scripts/load_shared_env.sh

([[ "w" = "w$(git diff --diff-filter=M --name-only HEAD^ HEAD package.json)" ]] && [[ -d node_modules ]]) || npm i --ignore-scripts
npm run build
