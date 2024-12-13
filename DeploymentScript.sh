#!/bin/bash

COMPOSE_FILE="docker-compose.yml"

# Function to start services and run seed commands
start_services() {
  echo "Starting services..."
  docker-compose -f $COMPOSE_FILE up -d

  echo "Waiting for services to be ready..."
  sleep 15  # sleep duration based on services startup time

  # echo "Running seed commands..."
  docker-compose run --rm backend node seed.js -d
  docker-compose run --rm backend node seedtables.js -d
  docker-compose run --rm backend node settingsseed.js -d

  echo "Services started and data seeded."
}

# Function to stop and remove services
stop_services() {
  echo "Stopping services..."
  docker-compose -f $COMPOSE_FILE down
  echo "Services stopped."
}

# Function to restart services
restart_services() {
  stop_services
  start_services
}

# Function to show usage
usage() {
  echo "Usage: $0 {start|stop|restart|seed|update-frontend|update-backend|update-services}"
  exit 1
}

# Function to run only seed commands
seed_data() {
  echo "Running seed commands..."
  docker-compose run --rm backend node seed.js -d
  docker-compose run --rm backend node seedtables.js -d
  docker-compose run --rm backend node settingsseed.js -d

  echo "Data seeded and backend containers removed."
}

# Function to update frontend
update_frontend() {
  echo "Building and updating frontend..."
  docker-compose build frontend
  docker-compose up -d frontend
  
   echo "Deleting dangling images..."
  docker image prune -f
  echo "Dangling images deleted."
  
  echo "Frontend updated."
}

# Function to update backend
update_backend() {
  echo "Building and updating backend..."
  docker-compose build backend
  docker-compose up -d backend

   echo "Deleting dangling images..."
  docker image prune -f
  echo "Dangling images deleted."
  
  echo "Backend updated only"
}

# Function to update both frontend and backend
update_services() {
  echo "Building and updating frontend and backend..."
  docker-compose build frontend backend
  docker-compose up -d frontend backend

  # echo "Running seed commands..."
  # docker-compose run --rm backend node seed.js -d
  # docker-compose run --rm backend node seedtables.js -d
  # docker-compose run --rm backend node settingsseed.js -d
  echo "Deleting dangling images..."
  docker image prune -f
  echo "Dangling images deleted."

  echo "Frontend and backend updated and using already seeded  or existing data."
}


# Main script
case "$1" in
  start)
    start_services
    ;;
  stop)
    stop_services
    ;;
  restart)
    restart_services
    ;;
  seed)
    seed_data
    ;;
  update-frontend)
    update_frontend
    ;;
  update-backend)
    update_backend
    ;;
  update-services)
    update_services
    ;;
  *)
    usage
    ;;
esac
