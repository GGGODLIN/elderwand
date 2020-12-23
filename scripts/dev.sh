#!/usr/bin/env bash

yarn config set proxy http://npm-proxy-cache:8080
yarn config set https-proxy http://npm-proxy-cache:8080
yarn config set strict-ssl false
yarn config list

yarn lib:link:install

yarn web:install

yarn lib:unlink
yarn lib:link:create
yarn lib:link

yarn web:dev
