#!/usr/bin/env bash

cd docker/nginx
mkdir -p ssl
openssl req -new -newkey rsa:2048 -days 3650 -nodes -x509 -sha256 -utf8 \
    -keyout ssl/server.key \
    -out ssl/server.crt \
    -config ssl.conf
