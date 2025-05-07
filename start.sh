#!/bin/bash
set -e

: "${NEXT_PUBLIC_API_BASE_URL:=https://api.lingofoundry.com/api}"

# Build the Docker image
echo "Building Docker image..."
docker build --build-arg NEXT_PUBLIC_API_BASE_URL="${NEXT_PUBLIC_API_BASE_URL}" -t lingo-foundry-web .

# Check if the build was successful
if [ $? -ne 0 ]; then
    echo "Docker build failed. Exiting."
    exit 1
fi
echo "Docker image built successfully."

echo "Stopping & removing any old container…"
docker rm -f lingo-foundry-web-container 2>/dev/null || true

# Run the Docker container
echo "Running Docker container..."
docker run -d -p 8080:8080 --name lingo-foundry-web-container lingo-foundry-web

# Check if the container started successfully
if [ $? -eq 0 ]; then
    echo "Docker container is running on port 8080."
else
    echo "Failed to start Docker container."
    exit 1
fi