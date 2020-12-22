#!/usr/bin/env bash

rm -rf node_modules/g13-web-shared

mkdir -p node_modules/g13-web-shared

cp -R ../G13.Web.Shared/dist/* node_modules/g13-web-shared/
