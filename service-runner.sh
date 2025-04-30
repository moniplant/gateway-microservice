#!/bin/bash

ARCH=$(uname -m)
if [ "$ARCH" = "armv7l" ]; then
  echo "Detected architecture: armv7l (ARM). Using armhf-specific override file."
  docker compose -f docker-compose.yaml -f docker-compose.override.armhf.yaml up -d
elif [ "$ARCH" = "aarch64" ]; then
  echo "Detected architecture: aarch64 (ARM64, Raspberry Pi 5). Running in production mode and skipping selected builds."
  docker compose --profile prod -f docker-compose.yaml -f docker-compose.override.aarch64.yaml up -d
else
  echo "Detected architecture: $ARCH. Using default configuration."
  docker compose up -d
fi