#!/usr/bin/env bash

# Stop all the background processes on CTRL-C
trap 'jobs -p | xargs kill' EXIT

http-server -p 8081 ../.. &
sleep 1
open http://localhost:8081/examples/browser/browser.html

wait
