#!/usr/bin/env bash

# Stop all the background processes on CTRL-C
trap 'jobs -p | xargs kill' EXIT

for i in {1..32}
do
    echo "Launching instance ${i}..."
    node index.js &
done
echo "Waiting..."
wait
