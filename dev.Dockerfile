FROM alpine
LABEL version="latest"
# 创建 git 用户以便和 gogs 的 post-receive 使用同一个服务器配置
# 然而使用 su root -c 'cmd' 就可以执行需要 root 用户权限的命令
RUN adduser -s /bin/sh -D git

RUN set -e && \
  sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
  sed -i 's/http:/https:/g' /etc/apk/repositories && \
  apk add --no-cache openssh git nodejs curl docker

WORKDIR /deploy
COPY . /deploy
RUN npm link . && rm -rf ~/.npm

WORKDIR /app
CMD [ "deploy", "-h" ]

RUN set -e && \
  git init . && \
  git config user.name 'x' && \
  git config user.email 'x@x.x' && \
  echo '{}'>package.json && git add -A && git commit -m 'init'