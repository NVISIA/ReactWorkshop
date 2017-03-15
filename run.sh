#!/bin/sh
#
# Launcher script for ReactJS Workshop app.
#
# VARIABLES
SECURE=0
PORT=9000
DB_FILE="node_modules/workshop-server/data/restaurants.db"
RESET_SCRIPT="./reset.sh"

#
# Install node deps
npm install

# Check if the DB needs to be bootstrapped and do it if necessary
[ ! -f "$DB_FILE" ] && "$RESET_SCRIPT"

# Build ReactJS app
npm run build

# Check secure flag
if [ $SECURE -gt 0 ]
then
	secarg="-s"
else
	secarg=""
fi

# Start the server
node node_modules/workshop-server/main --port $PORT $secarg -d ./build
