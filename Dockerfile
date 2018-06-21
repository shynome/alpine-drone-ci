FROM alpine as base
# 创建 git 用户以便和 gogs 的 post-receive 使用同一个服务器配置
# 然而使用 su root -c 'cmd' 就可以执行需要 root 用户权限的命令
RUN adduser -s /bin/sh -D git

RUN set -e && \
  # sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
  apk add --no-cache openssh git nodejs curl docker

FROM alpine
COPY --from=base / /

WORKDIR /app
CMD [ "deploy", "-h" ]

COPY package.json /root/.npm/
RUN npm i -g @shynome/alpine-drone-ci && rm -rf ~/.npm
