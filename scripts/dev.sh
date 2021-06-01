#!/usr/bin/env bash

#yarn config set proxy http://npm-proxy-cache:8080
#yarn config set https-proxy http://npm-proxy-cache:8080
#yarn config set strict-ssl false
#yarn config list

yarn install

yarn lib:link:install
yarn lib:unlink
yarn lib:link:create
yarn lib:link

# for localhost dev
yarn web:install
yarn web:dev
