#! /usr/bin/bash
docker-compose --env-file .env.development down
docker-compose --env-file .env.development up -d
ngrok tcp 5432

