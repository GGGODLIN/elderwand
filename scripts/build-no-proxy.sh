#!/usr/bin/env bash

yarn clear:all

yarn install --force
yarn add --dev typescript @types/node   
yarn next build 

sh scripts/handel-shared.sh
./node_modules/typescript/bin/tsc --project tsconfig.server.json
