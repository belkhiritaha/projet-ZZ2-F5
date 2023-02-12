#!/bin/bash

# This script is used to start the local development server, and the backend API server.

######### PORTS ############
# backend runs on port 8001
# mongodb runs on port 27017
# frontend runs on port 3000
############################


# Start the backend server
gnome-terminal --tab --title="API" -- bash -c "node APIdatabase/app.js"


# Start the frontend server
gnome-terminal --tab --title="Frontend" -- bash -c "npm start"
