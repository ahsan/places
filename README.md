# Places
Sample Node.js application implementing RESTful API for getting information about places.

# How to run the app

## Through Docker
1. Populate the following variables inside the .env file
```shell
API_PORT=
LOG_LEVEL=
GOOGLE_PLACES_API_KEY=
```
2. Build the docker image
```shell
docker build --tag places:v1 .
```
3. Run the container exposing the port defined in the .env file earlier
```shell
docker run -it --port 3000:3000 places:v1
```
4. Make a curl call to check server health
```shell
curl http://localhost:3000/v1/ping
```

## Manually
1. Populate the following variables inside the .env file
```shell
API_PORT=
LOG_LEVEL=
GOOGLE_PLACES_API_KEY=
```
2. Install the project dependencies
```shell
npm install
```
3. Start the application
```shell
npm start
```
