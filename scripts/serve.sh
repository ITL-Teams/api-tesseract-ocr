#!/bin/bash

# DELETE EXISTING CONTAINER
docker rm -f node-tesseract-server

# RUN CONTANER
if [[ "$OSTYPE" == "msys"* ]]; then
  working_directory=$(pwd -W)
else
  working_directory=$(pwd)
fi

docker run -p 80:3000 -v $working_directory/app/src:/home/app/src -tid --name node-tesseract-server node-tesseract:dev
