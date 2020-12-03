#!/usr/bin/env bash

docker logs -f --tail=20 $(docker ps | grep 'nginx$' | awk '{ print $1 }')
