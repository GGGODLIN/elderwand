# docker pull node:12.19.0-alpine3.12

FROM node:12.19.0-alpine3.12

LABEL name="node"
LABEL version="12.19.0-alpine3.12"

RUN apk add yarn

EXPOSE 3000

WORKDIR /opt

COPY package.json package.json
RUN rm -rf node_modules
RUN yarn install
RUN rm yarn.lock
