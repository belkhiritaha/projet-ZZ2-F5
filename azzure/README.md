# Installing dependencies
The dependencies have been updated. Please run `npm install` to install the latest dependencies.

# Running the app
Use `npm start` to run the app in development mode. This will only run the frontend. To run the backend, see below.
-The frontend runs on port 3000.

# Starting mongodb
The backend requires mongodb to be running. You need to have mongodb installed and running on your machine. If you don't have it installed, you can install (on Debian/Ubuntu) with `sudo apt-get install mongodb`. Then run `sudo service mongodb start` to start the service. (You can also use `sudo service mongodb stop` to stop the service.
-The mongodb database runs on port 27017.

# Running backend
You'll need to install nodemon globally first: `sudo npm install -g nodemon`
Then run:
`npm run back`
-The backend API runs on port 8001.

# Running the tests
`npm test` 
- If you run the tests and a lot of them fail, don't freak out (It's normal), you'll just have to change userIDs and vmIDs according to what you have on your local database.
- We are currently working to solve that problem and make the process automatic.

# Building the app
`npm run build`
(If you want to test the production build, you'll need to run the backend and mongodb as well.)
