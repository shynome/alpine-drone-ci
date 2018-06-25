FROM node:carbon-alpine

RUN set -e && \
  # sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
  apk add --no-cache openssh git curl

WORKDIR /app
CMD [ "deploy", "plugin" ]

COPY package.json /root/.npm/
RUN npm i -g @shynome/alpine-drone-ci && rm -rf ~/.npm
