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

# Check status
ret=$?
if [ $ret -ne 0 ]
then
	echo "npm install failed!"
	exit $ret
fi

# Check if the DB needs to be bootstrapped and do it if necessary
[ ! -f "$DB_FILE" ] && "$RESET_SCRIPT"

# Check status
ret=$?
if [ $ret -ne 0 -a $ret -ne 1 ] # 1 = warnings present but no errors
then
	echo "$RESET_SCRIPT failed!"
	exit $ret
fi

# Build ReactJS app
npm run build

# Check status
ret=$?
if [ $ret -ne 0 ]
then
	echo "npm run build failed!"
	exit $ret
fi

# Check secure flag
if [ $SECURE -gt 0 ]
then
	secarg="-s"
else
	secarg=""
fi

# Start the server
node node_modules/workshop-server/main --port $PORT $secarg -d ./build
