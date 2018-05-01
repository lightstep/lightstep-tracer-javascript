#!/usr/bin/env bash

# Stop all the background processes on CTRL-C
trap 'jobs -p | xargs kill' EXIT

node server.js &
sleep 1
open http://localhost:8081/

wait
