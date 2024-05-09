# Types of Data in Docker Volumes  based on data persistence

When working with Docker, it's essential to understand the different types of data involved, especially concerning volumes. Here's a breakdown of the types of data:

1. **Application (Code + Environment)**:
   - This data encompasses the contents of the Docker image itself, including the application code, dependencies, runtime environment, and other necessary files.
   - It's stored within Docker images and is read-only.
   - While not directly managed by Docker volumes, it serves as the foundation for containers that utilize volumes to persist data.

2. **Temporary App Data (e.g., User Input)**:
   - Temporary app data is data generated or manipulated by the running container during its execution.
   - It's dynamic and frequently changing, such as user input or transient application state.
   - This data is often stored in memory or temporary files within the container.
   - While read-write within the container, it's typically not persisted beyond the container's lifespan.
   - Temporary app data may be cleared regularly, especially if it's not needed beyond the current container session.

3. **Permanent App Data**:
   - Permanent app data is also generated or manipulated by the running container during its execution.
   - It includes data that needs to be preserved even if the container stops, restarts, or is deleted.
   - Examples include application logs, user uploads, configuration files, or data stored in a database.
   - This type of data is typically stored in files or databases within the container or in Docker volumes.
   - Stored in read-write mode, permanent app data persists across container sessions.
   - Docker volumes are commonly used to manage permanent app data, allowing it to persist even if the container is removed.

Understanding these distinctions is crucial for effectively managing data within Docker containers and volumes, ensuring data persistence and appropriate handling according to the application's needs.


```
  SO HOW DO WE MANAGE TO PERSIST DATA AFTER THE CONTAINER IS DELETED OR STOPPED. ? WE DO THIS THROUGH THE USE OF VOLUMES.
```

# Introducing Docker Volumes

What are volumes ?

```
    Docker volumes are folders on your host machine (i.e the local machine) hard drives which are mounted or in other words made available to your containers. Volumes can be mounted into one or more containers, allowing data to be shared and persisted across container instances.

```
# Docker Volumes: Solutions they Provide

Docker volumes solve several challenges related to data management and persistence in containerized environments. Here are some key problems that Docker volumes address:

1. **Data Persistence**: Containers are ephemeral by nature, meaning that any data stored within them is lost when the container is stopped or deleted. Docker volumes provide a way to persist data beyond the lifecycle of individual containers. This ensures that important data, such as application logs, configuration files, and user uploads, remains intact even when containers are recreated or scaled up/down.

2. **Data Sharing**: Docker volumes facilitate data sharing between containers and between containers and the host machine. By mounting the same volume into multiple containers, you can enable data exchange and collaboration among different parts of an application stack. This is particularly useful for microservices architectures where individual services need access to shared data.

3. **Performance Optimization**: Docker volumes offer performance benefits compared to traditional storage solutions like bind mounts. They leverage native filesystem drivers and optimized storage backends to provide faster I/O operations, reducing latency and improving application performance. This is crucial for high-throughput applications or those with stringent performance requirements.

4. **Data Isolation**: Docker volumes provide a mechanism for isolating data from the container's filesystem. This separation helps prevent accidental data loss or corruption caused by modifications to the container's filesystem. It also enables easier backup and restoration of data, as volumes can be managed independently of containers.

5. **Integration with External Storage Systems**: Docker volumes seamlessly integrate with external storage systems and cloud storage providers, allowing you to store data in distributed or remote storage environments. This enables hybrid cloud deployments and simplifies data management across diverse infrastructure setups.

6. **Stateful Applications**: For stateful applications, such as databases or message queues, Docker volumes are essential for preserving data integrity and ensuring consistent performance. Volumes provide a reliable mechanism for storing and accessing application state, allowing stateful containers to be easily managed and orchestrated.

Overall, Docker volumes offer a robust solution for managing data in containerized environments, addressing common challenges related to data persistence, sharing, performance, isolation, and integration with external storage systems. 


## Key Concepts:

1. **Data Persistence**: Docker volumes enable the persistence of data beyond the lifecycle of individual containers. This ensures that important data, such as application logs, configuration files, and databases, remains intact even when containers are stopped, restarted, or deleted.

2. **Data Sharing**: Volumes facilitate data sharing between containers and between containers and the host machine. By mounting the same volume into multiple containers, you can enable data exchange and collaboration among different parts of an application stack.

3. **Performance Optimization**: Docker volumes offer performance benefits compared to traditional storage solutions like bind mounts. They leverage native filesystem drivers and optimized storage backends to provide faster I/O operations, reducing latency and improving application performance.

4. **Data Isolation**: Volumes provide a mechanism for isolating data from the container's filesystem. This separation helps prevent accidental data loss or corruption caused by modifications to the container's filesystem.

5. **Integration with External Storage Systems**: Docker volumes seamlessly integrate with external storage systems and cloud storage providers, allowing you to store data in distributed or remote storage environments. This enables hybrid cloud deployments and simplifies data management across diverse infrastructure setups.

## Usage:

```
To see all docker volume options run docker volume --help
```

* When you add the field  ``` VOLUME [ "/app/feedback" ] ``` in your Dockerfile , during image creation this translates to('in layman') the path inside of the container which should be mapped to some folder outside the container where the data should survive

* Now and which path in our local system will docker mount it to ?
 
* we Run ``` docker volume ls``` to list all volumes that docker is currently managing.

* So we have two types of volumes:
<dl>
    <dt>
    Anyonymous volumes
    <dd> Anonymous volumes are managed by Docker and are not given a specific name. <dd>
    </dt>
     <dt>
    Named volumes
    <dd> Named volumes are user-defined volumes that have a specific name.<dd>
    </dt>
</dl>

###  Anonymouse volumes
<div style="line-height:30px">  When you add the field  ``` VOLUME [ "/app/feedback" ] ``` in your Dockerfile, this will create an anonymous volume. 

<b>NB:</b> <i> This volume will persist through the lifetime of the container and ones the container is stopped it'll cease to exist. This happens when you start / run a container with the --rm option.If you start a container without that option, the anonymous volume  <span style="text-transform: uppercase"><b>would NOT be removed</b></span>, even if you remove the container (with docker rm ...).</i>

<pre>
Still, if you then re-create and re-run the container (i.e. you run docker run ... again), a new anonymous volume will be created. So even though the anonymous volume wasn't removed automatically, it'll also not be helpful because a different anonymous volume is attached the next time the container starts (i.e. you removed the old container and run a new one).

Now you just start piling up a bunch of unused anonymous volumes - you can clear them via <code> docker  volume rm VOL_NAME </code> or <code> docker volume prune </code>.
</pre>


If you ran ```docker volume ls``` , anonymous will be listed as under Driver is "local" and under "VOLUME NAME" is a cryptographic hash
</div>

### Named volumes

<pre>
They are created and managed by Docker and can be referenced by their name when mounting into containers.
Named volumes provide a way to persist data across container lifecycles and are commonly used for storing important application data, configuration files, and databases.
They are not attached to a container and can be accessed even when the container is stopped or deleted
</pre>

<p> So, how do we create named volumes </p>

We cannot create named volumes inside a docker file like we did with unnamed volumes above: We create a named volume only when we run a container in the following manner
```
 docker run -d -p 3000:80 --rm --name "container name" -v "volumeNameOfYourChoice:pathInTheContainerToMount " "image name"
```

Example: 
```
    docker run -d -p 3000:80 --rm --name sampleApp -v sample:/app/feed image-name:image-tag

    The above command can be explained as:

    # Docker Run Command

        The `docker run` command is used to run a Docker container. Below are explanations of the options and arguments used in the command:

        - `-d`: This option runs the container in detached mode, meaning it runs in the background.

        - `-p 3000:80`: This option maps port 3000 on the host machine to port 80 inside the container. This allows you to access the containerized application running on port 80 from port 3000 on the host machine.

        - `--rm`: This option specifies that the container should be automatically removed once it's stopped. This helps keep the system clean by removing the container automatically after it's no longer needed.

        - `--name feedback-app`: This option assigns a name to the container. In this case, the container is named "feedback-app".

        - `-v feedback:/app/feedback`: This option mounts a volume named "feedback" into the container at the path "/app/feedback". The format is `-v <volume_name>:<container_path>`. This allows data to be shared and persisted between the host machine and the container.

        - `feedback:volume`: This is the name of the Docker image to run the container from. It specifies the image named "feedback" with the tag "volume".



```

# Understanding Bind Mounts in Docker

With Docker volumes, you don't have control over the specific path where Docker mounts your files or directories. Docker manages this internally, and any changes to your code typically require rebuilding the entire container from scratch and then remounting it.

To avoid this cumbersome process, Docker provides **Bind Mounts**. With bind mounts, you, the user, specify exactly where you want Docker to bind your paths. This gives you control over the locations on your host machine's filesystem that you want to make available inside the container.

In essence, bind mounts offer the flexibility to directly map directories or files from your host machine into the container's filesystem. This makes it easier to work with code and other data without the need for rebuilding the container each time a change is made.

Just refresh your web app and the code changes are picked only for presentational files eg html. 

So for example you added `console.log`  or edited server files, in order to view those changes you have to either <br>
    1. stop the container and restart it again manually through `docker stop`
    2. in the case of nodejs add `nodemon` in the script and `['npm','start']` script

NB :


       For windows file system using wsl2 the refreshing might now work as expected unless you store your project and project files in directly in the Linux file system. To access the linux file system on windows , check the "docs/windows-wsl2-file-events.pdf" folder  .

This approach is particularly useful during development when frequent changes are made to code or configuration files. Instead of rebuilding the container every time a change is made, you can simply mount the relevant directories using bind mounts, allowing for a more efficient and streamlined development workflow.

# How To Create a Bind Mount

We use the following command to create a bind mount:

```
docker run -p 3000:80 -v presentWorkingDirectoryOfTheHostMachine:/app -v /app/node_modules imageName:ImageTag

Example
docker run -p 3000:80 -v $(pwd):/app -v /app/node_modules feedback:volume

```

Explanation of the above code. 

## Explanation of Docker the above Command
``` docker run -p 3000:80 -v presentWorkingDirectoryOfTheHostMachine:/app -v /app/node_modules feedback:volume```

The `docker run` command is used to run a Docker container with various options. Here's an explanation of the options used in the provided command:

- `-p 3000:80`: This option maps port 3000 on the host machine to port 80 inside the container. It allows you to access the application running inside the container on port 80 from port 3000 on your host machine.
  
- `-v $(pwd):/app`: This option specifies a bind mount. `$(pwd)` is a command substitution that resolves to the present working directory (PWD) on the host machine. It maps the current directory on the host to the `/app` directory inside the container. This bind mount is used to share the application code from the host machine with the container.
  
- `-v /app/node_modules`: This option specifies another bind mount. It maps the `/app/node_modules` directory inside the container. This is typically used to ensure that the `node_modules` directory, where Node.js dependencies are installed, is persisted outside the container. This is necessary because the `node_modules` directory is usually not included in the application code and needs to be managed separately.
  
- `feedback:volume`: This is the name of the Docker image to run the container from. It specifies the image named "feedback" with the tag "volume".

## Points to Note on Bind mounts.
### Application Code

The part `-v presentWorkingDirectoryOfTheHostMachine:/app` makes sure that the code of the application, which is stored on your computer, is connected to the container where it's going to run. This means you can write and change your code on your computer, and those changes will immediately affect the application running inside the container, without needing to do anything fancy like rebuilding the whole thing.

## Node.js Dependencies

The bind mount `-v /app/node_modules` ensures that the `node_modules` directory, where Node.js dependencies are installed using npm or yarn, is persisted outside the container. This directory is typically not included in the application code and needs to be managed separately. By mounting the node_modules directory into the container, the dependencies are available to the application without the need for manual installation steps inside the container.

# Docker Bind Mount Best Practices

When using bind mounts in Docker, consider the following best practices to ensure smooth operation:

1. **Provide Absolute Path of Your File in Your Respective Project Folder**: 
   When specifying the path to your file or directory for the bind mount in Docker, it's important to provide the absolute path. The absolute path includes the full directory path starting from the root directory. 

   Example:
   ```bash
   docker run -v /absolute/path/to/your/folder:/container/mount/point image_name
   ```

   NB:
    you can replace `absolute/path/to/your/folder` with the following respective code according to different os as showed [path](#path-shortcuts)
2. **Wrap Path Inside Quotes If It Has Special Characters**:

    If the path to your file or directory contains special characters, such as spaces or symbols, wrap the path inside double quotes ("").Example
    ```bash
    docker run -v "/path/with/special characters:/container/mount/point" image_name    
    ```
3. **Ensure Folder Path Ends with the Folder Name and Not File Name**:

    When specifying a directory path for the bind mount, make sure the path ends with the name of the folder and not the name of a specific file within the folder.
    Example:
    ```bash
    docker run -v /path/to/folder:/container/mount/point image_name
    ```
4. **Ensure Docker Has Access to the Folder You Are Sharing as Bind Mount**:

    Additionally, ensure that Docker itself has the necessary permissions to access the folder

    * Go to the docker Application
    * Top left click on settings
    * on the menu click on resources
    * Under resources click on file sharing.
    * choose the path. If the parent directory  where your project is kept is available then it's okey



``` Using Shortcuts for Docker needs permission to access the folder you are sharing as a bind mount. Make sure that the folder has the appropriate permissions set to allow Docker to read and write to it. r Docker Bind Mounts```

#### path shortcuts
Just a quick note: If you don't always want to copy and use the full path, you can use these shortcuts:

### macOS / Linux:
```bash
-v $(pwd):/app
This shortcut uses $(pwd) to represent the current working directory. It automatically resolves to the full path of the current directory where the command is executed. For example: docker run -v $(pwd):/app my_image
```

Windows:
```bash

-v "%cd%":/app

On Windows, %cd% is used to represent the current working directory. It resolves to the full path of the current directory. For example:


docker run -v "%cd%":/app my_image
```
Using these shortcuts simplifies the process of specifying bind mounts, especially when working with multiple directories or in scripts.





<!-- - **Creating Volumes**: Volumes can be created using the `docker volume create` command or automatically created when a container is started with the `-v` or `--mount` flag.

- **Mounting Volumes**: Volumes can be mounted into containers using the `-v` or `--mount` flag when running containers with the `docker run` command.

- **Managing Volumes**: Docker provides commands for managing volumes, including listing existing volumes (`docker volume ls`), inspecting volume details (`docker volume inspect`), and removing volumes (`docker volume rm`). -->







