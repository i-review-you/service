#!/bin/bash
set -e
EXIT_CODE=0

cd /var/app/staging
runuser -u webapp -- npm install next || EXIT_CODE=$?
echo $EXIT_CODE
