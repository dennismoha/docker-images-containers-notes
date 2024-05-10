# Build Arguments

Build arguments, often denoted by ARG in Dockerfiles, are parameters that can be passed to the docker build command at build time. They allow for dynamic customization of the Docker image during the build process.

Here's how build arguments work in Docker:

1. **Define Build Arguments in Dockerfile**: In the Dockerfile, you can declare build arguments using the ARG instruction. These arguments act as variables that can be used in subsequent instructions within the Dockerfile.

` ARG VERSION=latest`

<b> ARGS CANNOT BE USED ON THE CMD command </b> </br>
<b> Args CANNOT BE USED ON THE CODE. USE ENVIROMENT PATHS. ENV</b>

2. **Use Build Arguments in Dockerfile**: Once declared, build arguments can be used in various instructions, such as FROM, RUN, COPY, and ENV. They are substituted with their values during the build process. `FROM ubuntu:${VERSION}`.

Example:
```
    ARG DEFAULT_PORT=30
    ENV PORT $DEFAULT_PORT // environment variable
    EXPOSE $PORT
```

3. **Pass Build Arguments during docker build**: When you build the Docker image using the docker build command, you can pass values for the defined build arguments using the --build-arg flag.

`docker build --build-arg VERSION=20.04 -t my_image . `

NB:

Don't add env and ARGS on top of other commands on the Dockerfile. Remember docker is layer based and any change on dockerfile the image has to be rebuilt and in that manner the npm install will be run.

Just add them below the npm install command to make sure that even if they change, the process for rebuilding the image is not heavy enough with installing npm packages since none of the layer above has changed