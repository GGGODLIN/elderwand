# docker pull node:14.15.3-alpine3.12

FROM node:14.15.3-alpine3.12

LABEL name="node"
LABEL version="14.15.3-alpine3.12"

# RUN apk update && apk upgrade && \
#     apk add --no-cache bash git openssh

RUN apk add yarn

WORKDIR /opt

COPY package.json package.json

RUN rm -rf node_modules
RUN yarn install

RUN rm yarn.lock

EXPOSE 3000

