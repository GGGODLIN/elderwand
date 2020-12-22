#!/usr/bin/env bash

yarn config set proxy http://npm-proxy-cache:8080
yarn config set https-proxy http://npm-proxy-cache:8080
yarn config set strict-ssl false
yarn config list


yarn clear:all
# yarn web:install
yarn install --force

yarn add --dev typescript @types/node   

yarn next build 

sh scripts/handel-shared.sh
./node_modules/typescript/bin/tsc --project tsconfig.server.json
