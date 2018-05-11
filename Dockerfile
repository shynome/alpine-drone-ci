FROM alpine
# 创建 git 用户以便和 gogs 的 post-receive 使用同一个服务器配置
RUN adduser -s /bin/sh -h /root -D git

RUN set -xe && \
  apk add --no-cache openssh git nodejs 
  
