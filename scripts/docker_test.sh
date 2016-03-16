#!/usr/bin/env bash

docker run -t --rm --name test-runner-lightstep-tracer \
    -v ${PWD}:/usr/src/lightstep-tracer -w /usr/src/lightstep-tracer \
    node:$1 npm test
