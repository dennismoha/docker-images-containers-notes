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

# How replace default commands in active containers

- When you create a container using `docker run `, you can replace this command with another command by <b>appending</b> another command after the <i>image name</i> in the `docker run`

When you create a container using `docker run`, you have the ```flexibility``` to replace the default command with another command by simply ```appending it after the image name in the docker run command```.

Question. What do we mean by ```default docker command in the above explanation ?```

#### explanation.


- By "default command" in the context  provided in the definition above, it means the command that Docker will run when it starts a container based on a particular image.

- When you use docker run to create a container, Docker typically executes a default command specified within the Docker image. This default command is often defined in the Dockerfile used to build the image, typically using the CMD instruction. For example, if the Dockerfile contains:

Dockerfile

```bash
Copy code
CMD ["npm", "start"]
```

Then when you create a container from that image using docker run, Docker will automatically run npm start inside the container.

However, with Docker, you have the flexibility to override this default command by appending another command after the image name in the docker run command. This allows you to execute different commands inside the container at runtime, providing flexibility and customization options.



Example:

- If am running a node image but I realize i need to install dependencies then I can use npm exec as follows:

`docker run -it -v hostpathtoMount:/dockerPAthToMount ImageName commandToRun`

eg: 

example 1
`docker run -it -v $(pwd):/app  nodeImage npm install `check your project on your machine and node_modules and the package.json, package-lock.json will be there

example 2
`docker run -it -v $(pwd):/app  nodeImage npm install express `; check your project on your machine and node_modules and the package.json, package-lock.json will be there

The advantage with this is, assuming you are in an environment where nodejs is not installed in your system, then you can use the above method to spin a nodejs Project whose files are shared by both the container and docker.

# ISSUE WITH RUNNING COMMAND REPLACEMENT WITH THE  ABOVE METHOD

<!-- - Runnint commands as shown above is risky in the manner there is no control over which methods to run and you might ran commands which might delete or damage your other files that are not in relation to that.

Question: How can we avoid that ?

Solution: We use the `ENTRYPOINT` command in the dockerfile.

- `ENTRYPOINT` command works simmilar to the    `CMD` command but differs in the sense that `ENTRYPOINT` command runs all commands which causes re -->