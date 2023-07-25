#!/bin/bash
echo "Starting dev server"

yarn format:write && yarn format:check && yarn start:dev
