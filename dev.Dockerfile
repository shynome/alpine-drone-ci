FROM node:carbon-alpine

RUN set -e && \
  # sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
  apk add --no-cache openssh git curl

WORKDIR /deploy
COPY . /deploy
RUN npm link . && rm -rf ~/.npm

WORKDIR /app
CMD [ "deploy", "-h" ]

