#!/usr/bin/env bash

export ELDERWAND_NETWORK=$(docker network ls | grep 'elderwand-network' | awk '{print $1}')

echo $ELDERWAND_NETWORK

if [[ -z "$ELDERWAND_NETWORK" ]]; then
    docker network create elderwand-network
fi
