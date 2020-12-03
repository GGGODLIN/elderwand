#!/usr/bin/env bash

mkdir -p ssl
cd docker/nginx/ssl
# mkcert  rex.com "*.rex.com" localhost 127.0.0.1 ::1
echo $@
# mkcert localhost 127.0.0.1 ::1 example.com "*.example.com" 
mkcert localhost 127.0.0.1 ::1 $@
