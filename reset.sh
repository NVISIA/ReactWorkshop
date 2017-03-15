#!/bin/sh
#
# Installs dependencies and bootstraps the database.
#
npm install
node node_modules/workshop-server/modules/bootstrap
