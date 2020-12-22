#!/usr/bin/env bash

yarn config set proxy http://npm-proxy-cache:8080
yarn config set https-proxy http://npm-proxy-cache:8080
yarn config set strict-ssl false
yarn config list

cd ../G13.Web.Shared/ && yarn install
cd ../opt

echo $(pwd)

yarn init-link-package

yarn clear:all

yarn web:install
yarn web:dev
