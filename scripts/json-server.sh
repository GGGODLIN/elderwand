#!/usr/bin/env bash

FILE=.temp/db.json

if [ ! -f "$FILE" ]; then
    echo "$FILE not exists."
    mkdir -p .temp/ && cp __tests__/fixture/db.json .temp/db.json
fi

json-server .temp/db.json --host 0.0.0.0 --port 4000 --routes test/json-server/routes.json --watch test/json-server/routes.json .temp/db.json
