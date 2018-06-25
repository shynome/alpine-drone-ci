FROM node:carbon-alpine

RUN set -e && \
  # sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
  apk add --no-cache openssh git curl

WORKDIR /deploy
COPY package.json /deploy/package.json
RUN npm install --production && rm -rf ~/.npm

COPY . /deploy
RUN npm link . 

WORKDIR /app
CMD [ "deploy", "$PLUGIN_ACTION" ]

