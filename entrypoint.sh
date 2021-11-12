#!/bin/sh

JSON_STRING='window.configs = { \
  "CLOUD_RUN_SERVICE":"'"${CLOUD_RUN_SERVICE}"'", \
  "PADLET_TARGET":"'"${PADLET_TARGET}"'", \
  "GA_ID":"'"${GA_ID}"'", \
}'

sed -i "s@// CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@" /usr/share/nginx/html/index.html

exec "$@"
