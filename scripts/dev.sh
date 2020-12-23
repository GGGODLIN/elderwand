#!/usr/bin/env bash

yarn config set proxy http://npm-proxy-cache:8080
yarn config set https-proxy http://npm-proxy-cache:8080
yarn config set strict-ssl false
yarn config list

yarn lib:unlink
yarn lib:link:create
yarn lib:link

yarn web:install
yarn web:dev
