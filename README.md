# Lingo Foundry Web

This is the web frontend for Lingo Foundry, built with Next.js.

## Prerequisites

* Node.js LTS (v16+)
* npm (v8+)
* Docker (optional, for containerized setup)

## Environment Variables

* `NEXT_PUBLIC_API_BASE_URL` (default: `https://api.lingofoundry.com/api`)

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```
2. Start development server:

   ```bash
   NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL} npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

1. Build the app:

   ```bash
   NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL} npm run build
   ```
2. Start in production mode:

   ```bash
   npm run start-prod
   ```

## Docker

A `Dockerfile` is included to containerize the application.

### Using the provided script

Run the `start.sh` script to build and run the Docker container:

```bash
chmod +x start.sh
./start.sh
```

The script will:

* Build the Docker image with the `NEXT_PUBLIC_API_BASE_URL` build argument.
* Stop and remove any existing container named `lingo-foundry-web-container`.
* Run a new container mapping port 8080.

### Manual Docker commands

```bash
# Build the image
NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL} \
  docker build -t lingo-foundry-web .

# Run the container
docker run -d -p 8080:8080 --name lingo-foundry-web-container lingo-foundry-web
```

Access the app at [http://localhost:8080](http://localhost:8080).

## Troubleshooting

* Ensure Docker daemon/service is running.
* Check container logs:

  ```bash
  docker logs lingo-foundry-web-container
  ```
* If you update environment variables, rebuild the image to apply changes.
