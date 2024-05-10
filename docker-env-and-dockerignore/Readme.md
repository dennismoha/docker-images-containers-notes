## What is `.dockerignore`?

The `.dockerignore` file is used to specify which files and directories should be excluded when building a Docker image. Similar to how `.gitignore` works in Git, the `.dockerignore` file helps to prevent unnecessary or sensitive files from being included in the image, reducing its size and improving build performance.

### Usage

When building a Docker image, Docker looks for a `.dockerignore` file in the root directory of the build context (the directory specified in the `docker build` command). Any files or directories listed in the `.dockerignore` file will be excluded from the build context, meaning they will not be sent to the Docker daemon for inclusion in the image.

### Common Exclusions

Common files and directories to include in a `.dockerignore` file might include:

- Temporary files (e.g., `.tmp`, `.bak`)
- Editor-specific files (e.g., `.vscode`, `.idea`)
- Dependency directories (e.g., `node_modules`, `vendor`)
- Build artifacts (e.g., `*.log`, `*.out`, `*.class`)
- Configuration files with sensitive information (e.g., `.env`, `*.key`, `*.pem`)

### Benefits

Excluding unnecessary files and directories using `.dockerignore` can help to:
- Reduce the size of Docker images
- Improve build times
- Decrease network transfer times when pushing/pulling images
- Reduce storage requirements on Docker hosts
- Maintain the security and integrity of Docker images by preventing sensitive information from being inadvertently included.

# Environment variables



Environment variables are a way to pass configuration information to Docker containers. They are key-value pairs that can be used to customize the behavior of applications running inside containers.

## Setting Environment Variables

You can add environment variables to a Docker container in two main ways:

1. **Dockerfile**: Environment variables can be set directly in the Dockerfile using the `ENV` instruction. This allows you to define default values for environment variables within the Docker image.
   
   ```Dockerfile
   ENV DB_HOST=localhost  DB_PORT=5432
   ```
2. **Docker run**: You can also set environment variables when running a container using the docker run command. This method allows you to override the values set in the Dockerfile or provide additional environment variables specific to the container instance.

They can be   passed dynamically using the `-e` or `-env`

#### passing a single environment variable
`docker run -env DB_HOST=example.com  my_container`. You can add more environment paths here

#### passing multiple environment variables

`docker run -e DB_HOST=example.com -e DB_PORT=5432 my_container`

3. **.env file**: 
If you have a .env file containing environment variables, you can still use it with Docker, but you'll need to handle it appropriately during the Docker build and run processes using the `--env-file`.

`docker run --env-file ./pathto.env --name  my_container`. 

## Accessing Environment Variables in Applications

Inside the container, environment variables are typically accessed using language-specific mechanisms. For example, in Node.js applications, you can access environment variables using the process.env object:

`const dbHost = process.env.DB_HOST` </br>
`const dbPort = process.env.DB_PORT`;

## Referencing Environment Variables in Dockerfile

You can reference environment variables directly in the Dockerfile using the `${VARIABLE_NAME}` syntax. This allows you to use environment variables as part of commands or instructions in the Dockerfile.

Example: Dockerfile

```bash

ENV PORT 80

EXPOSE $PORT

```

<span style="text-align:center; font-size:20px">
Remember to include .env in your .dockerignore file to prevent it from being inadvertently included in the Docker image, especially if it contains sensitive information.
</span>

<marquee>
One important note about environment variables and security: Depending on which kind of data you're storing in your environment variables, you might not want to include the secure data directly in your Dockerfile.

Instead, go for a separate environment variables file which is then only used at runtime (i.e. when you run your container with docker run).

Otherwise, the values are "baked into the image" and everyone can read these values via docker history <image>.

For some values, this might not matter but for credentials, private keys etc. you definitely want to avoid that!

If you use a separate file, the values are not part of the image since you point at that file when you run docker run. But make sure you don't commit that separate file as part of your source control repository, if you're using source control.

</marquee>