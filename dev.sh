#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Load server env (DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, etc.)
set -o allexport
# shellcheck source=/dev/null
source "$SCRIPT_DIR/server/.env"
set +o allexport

WEB_PID=""
SERVER_PID=""

cleanup() {
    echo ""
    echo "Shutting down dev servers..."
    [[ -n "$WEB_PID" ]] && kill "$WEB_PID" 2>/dev/null
    [[ -n "$SERVER_PID" ]] && kill "$SERVER_PID" 2>/dev/null
    wait "$WEB_PID" "$SERVER_PID" 2>/dev/null
    echo "Stopping PostgreSQL container (data preserved)..."
    docker compose -f "$SCRIPT_DIR/server/docker-compose.yml" stop
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start postgres via docker compose
echo "Starting PostgreSQL..."
docker compose -f "$SCRIPT_DIR/server/docker-compose.yml" up -d

# Wait for postgres to accept connections
echo "Waiting for PostgreSQL to be ready..."
until docker exec local-postgres-db pg_isready -U "$DB_USER" -d "$DB_NAME" >/dev/null 2>&1; do
    sleep 1
done
echo "PostgreSQL is ready."

# Run Prisma migrations
echo "Running Prisma migrations..."
cd "$SCRIPT_DIR/server"
npx prisma migrate deploy
echo "Migrations done."

# Start web dev server
cd "$SCRIPT_DIR/web"
npm run dev &
WEB_PID=$!

# Start server dev server
cd "$SCRIPT_DIR/server"
npm run dev &
SERVER_PID=$!

echo ""
echo "Dev servers started. Press Ctrl+C to stop."
echo "  Web    PID: $WEB_PID"
echo "  Server PID: $SERVER_PID"
echo ""

wait
