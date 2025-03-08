#!/bin/bash

ARCH=$(uname -m)
if [ "$ARCH" = "armv7l" ]; then
  echo "Detected architecture: armv7l (ARM). Using armhf-specific override file."
  docker-compose -f docker-compose.yml -f docker-compose.override.armhf.yml up
else
  echo "Detected architecture: $ARCH. Using default configuration."
  docker-compose up
fi