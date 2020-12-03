#!/usr/bin/env bash

docker exec $(docker ps | grep 'nginx$' | awk '{ print $1 }') /bin/sh -c "nginx -s reload"
