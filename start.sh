#!/usr/bin/env bash

set -e

role=${CONTAINER_ROLE:-api}
env=${NODE_ENV:-production}

echo "Running container role \"$role\" in \"$env\" environment. "

if [ "$role" = "api" ]; then

    node server.js

else

    echo "Could not match the container role \"$role\""
    exit 1

fi