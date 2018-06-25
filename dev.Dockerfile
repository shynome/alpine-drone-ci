FROM node:carbon-alpine

RUN set -e && \
  apk add --no-cache openssh git curl

WORKDIR /deploy
COPY package.json /deploy/package.json
RUN npm install --production && rm -rf ~/.npm

COPY . /deploy
RUN npm link . 

WORKDIR /app
CMD [ "deploy", "plugin" ]

