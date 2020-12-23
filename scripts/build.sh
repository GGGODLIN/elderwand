#!/usr/bin/env bash

yarn config set proxy http://npm-proxy-cache:8080
yarn config set https-proxy http://npm-proxy-cache:8080
yarn config set strict-ssl false
yarn config list


yarn lib:unlink
yarn lib:link:create
yarn lib:link

yarn add --dev typescript @types/node   
yarn web:install

yarn next build && ./node_modules/typescript/bin/tsc --project tsconfig.server.json
