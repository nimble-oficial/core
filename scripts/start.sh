#!/bin/bash

check_if_node_modules_exists(){
    echo "Checking if dependencies are installed"
    DIR=node_modules

    if [ -d "$DIR" ]; then
        echo "$DIR found."
    else
        echo "$DIR does not exist."
        echo "Installing dependencies"
        yarn install
    fi
}

check_if_env_file_exists() {
    echo "Checking if .env file exists"
    FILE=.env

    if [ -f "$FILE" ]; then
        echo "$FILE found."
    else
        echo "$FILE does not exist."
        echo "Creating $FILE"
        cp .env.example .env
    fi
}

load_env_file() {
    echo "Loading environment variables"
    source .env
    sleep 2
}

start_based_on_environment() {
    load_env_file

    if [ "$NODE_ENV" = "development" ]; then
        ./scripts/start-dev.sh
    elif [ "$NODE_ENV" = "production" ]; then
        ./scripts/start-prod.sh
    elif [ "$NODE_ENV" = "test" ]; then
       continue
    else
        echo "No environment specified. Allowed values: development, production"
    fi
}

start_containers() {
    echo "Starting docker containers"
    docker-compose up -d
}

push_migrations() {
    sleep 2
    echo "Pushing migrations"
    yarn prisma db push
}

check_if_node_modules_exists
check_if_env_file_exists
start_containers
start_based_on_environment
push_migrations
