FROM alpine
LABEL version="latest"
# 创建 git 用户以便和 gogs 的 post-receive 使用同一个服务器配置
# 然而使用 su root -c 'cmd' 就可以执行需要 root 用户权限的命令
RUN adduser -s /bin/sh -D git

RUN set -e && \
  apk add --no-cache openssh git nodejs curl docker

WORKDIR /app
CMD [ "deploy", "-h" ]

RUN npm i -g @shynome/alpine-drone-ci@0.0.2 && rm -rf ~/.npm

