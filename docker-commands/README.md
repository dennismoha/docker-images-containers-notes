# Other docker commands

## Docker exec
- `docker exec`: This command allows you to run a command inside a running Docker container. It's particularly useful for executing commands or running scripts within a container without having to start a new instance of the container.

### Sysntax and using it

`docker exec containerName commandYouWantToExecute`
To create and run a Node.js application in Docker without needing <b>npm</b> installed on your local system using `docker exec,` you can follow these steps:

1) <b>Create the Docker Container</b>: Start by creating a Docker container based on the Node.js image. You can do this using the docker run command:
```bash

docker run -d --name my-node-container node
```
- This command creates a Docker container named <b>my-node-container</b> based on the latest Node.js image.

-  Now, you can execute npm commands inside the running container using `docker exec`. ```If you want to initialize a new Node.js project, you can do so with the following command:```

```bash

docker exec -it my-node-container npm init -y
```
- This command runs `npm init -y` inside the <i>my-node-container</i> container, initializing a new Node.js project with default values and without requiring npm to be installed on your local system.

You can then proceed to write your Node.js application code and run it inside the Docker container.

```Remember to use the -it flags with docker exec if you want to interact with the container (e.g., if you're prompted for input during the npm init process).```

```In summary, you create a Docker container based on the Node.js image.
Then you use docker exec to execute npm commands inside the container, allowing you to manage Node.js dependencies and projects without npm being installed on your local system.
```