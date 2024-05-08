# How to view all docker commands:

* docker --help


# How to build the docker image:
* Navigate using your terminal to the respective folder with the dockerfile:
* run `docker build .` or if you are in another location where the docker image ain't run docker ../enter path to your dockerfile.
*    This will build a new image based on the instructions set in the dockerFile.


# How to run the docker image as a container:
* After docker build . is finished, copy the docker id something  that looks like this  __ writing image sha256:8870cd4a3b84c654791b45eef20a45e6ea53c3c5dc987__ 

* Then run docker run 8870cd4a3b84c654791b45eef20a45e6ea53c3c5dc987
* run docker ps: this command lists all running containers. so you will be able to see your running container
* to stop the container run docker stop "container name"  - in the terminal container name will be proviced

* docker ps -a : will show all containers that are not running. your container can also be seen here.

* docker run -p: this is the docker portforwarding that enables you to expose the network ports of a container to the host machine or other containers. NB: The above two ports don't have to be identical. docker run -p PORT NUMBER_To_map_from. docker run -p systemport imageID: internal_docker_exposed_port, eg, docker run -p 3000:3000 8870cd4a3b84c654791b45eef20a45e6ea53c3c5dc987

   ```
   For all docker commands where an ID can be used, you don't always have to copy / write out the full id.

        You can also just use the first (few) character(s) - just enough to have a unique identifier.

        So instead of

        docker run abcdefg
        you could also run

        docker run abc
        or, if there's no other image ID starting with "a", you could even run just:

        docker run a
        This applies to ALL Docker commands where IDs are needed.


### MORE TO NOTE ABOUT CONTAINERS AND IMAGES

#### 1) images are READ-ONLY
    
    DOCKER IMAGES are READONLY which means once you run docker build . and the image has been created, it cannot pick your changes on the code.

So to solve this issue you:

    a) run docker build .  again on the same code. This will come with a new name , id ,etc
    b) 

####   2)  IMAGES ARE LAYER BASED
* Docker is said to be layer-based because of its use of a layered file system to manage and store container images efficiently.
- What this means is : each layer represents a specific instruction in the Dockerfile (e.g., installing dependencies, copying files). When you build a Docker image, Docker caches each layer. If you make changes to your Dockerfile and rebuild the image, Docker only rebuilds the layers that have changed. i.e, it runs instructions in the dockerfile whose content has changed. That's why incase of changes in the code rebuilding a new image from an arleady prebuilt image is faster than building the original image at first time.  This incremental build process speeds up the image build time significantly.

* <b>Now, whenever one layer changes all other layers are also rebuilt afresh.</b>

```
     One small caveat for this is   if your dockerfile looks as below then one change in the code will force npm install to run. That is if no dependency was added or removed and was just a code change then npm install is unneccessary. 
 
        FROM node:14


        WORKDIR /app


        COPY . /app


        RUN npm install


        EXPOSE 3000

        CMD ["node", "app.js"]
```

#### optimization solution for the above solution

<p> to solve the above issue then we have docker first copy the package.json, then run npm install and then copy the app folders later. </p>

<p>this will make sure that npm install will run only when  something changes in the package.json. This will make the overall process faster. <p>

<p>incase any changes take place in the code, the files will only be copied but npm install won't be ran since it's unneccessary.</p>

<b> This is one advantage of the docker layered file system </p>

```
    
 
        FROM node:14        

        WORKDIR /app

        COPY package.json  /app

        RUN npm install

        COPY . /app        

        EXPOSE 3000

        CMD ["node", "app.js"]
```

### 3) single Docker image can be used to run multiple containers
* A single Docker image can be used to run multiple containers. Each container instantiated from the same image operates independently, isolated from other containers, and can execute its own processes.

* When you create a container from a Docker image, you are essentially launching an instance of that image. Multiple containers can be created from the same image, and each container maintains its own runtime environment, file system, and network configuration.

* This capability is one of the key advantages of Docker's containerization technology. It allows you to scale your application horizontally by running multiple instances of the same service or application, each within its own isolated container. 

* This approach promotes resource efficiency, as it enables you to utilize the underlying hardware more effectively by distributing workloads across multiple containers. 

* Additionally, it provides flexibility in managing and scaling individual components of your application independently.


# Core Docker configurations for Images and containers

### 1) Listing all docker containers
*  <b>docker ps --help : Shows all commands for docker ps

* docker ps  - lists all running containers
* docker ps  -a - lists all containers that have ever been created on our machine. Running this command will show a list of all containers, along with details such as container ID, image used, container status (running or stopped), names, and more. The -a option is used to include all containers, including those that are currently stop



### 2) Stopping and Restarting containers


#### caveat
         Every time you execute docker run on a pre-existing image,
         Docker creates a new container instance based on that image.
         Regardless of how many times you run docker run with the same image,
         each execution will result in the creation of a new container instance.
         This allows for the deployment of multiple instances of the
         same application or service, each running in its own container.


<b> Althought the above is neccessary at time, to go against it if you don't want it :  </b>

#### solution:
* docker start <container_id_or_name>



    If you want to avoid creating a new container every time docker run is executed for a pre-existing image and instead start an existing container, you can use the docker start command.

    Here's how you can use docker start:

    1)  list all existing containers on your system using docker ps -a to identify the container you want to start.
    2) Once you have identified the container you want to start, use the docker start command followed by the container's ID or name.
    3) Using docker start allows you to manage existing containers and start them as needed without creating new instances each time. It's particularly useful for restarting stopped containers or managing long-running services.

### 3) Attached and Detached containers
         
  - #### A) Attached mode:
  * When you run a Docker container in attached mode, it starts in the foreground and attaches the terminal to the container's standard input, output, and error streams (stdin, stdout, stderr).
  * You can see the output generated by the container directly in your terminal window, and you can interact with the container's processes using your terminal. Any logs eg console.log in javascrcipt or messages produced by the container are displayed in real-time.

  * The container's output is intermingled with your terminal's output, and you must manually stop the container (e.g., by pressing Ctrl+C) to exit and return to your terminal prompt. Example: docker run <image_name>

    ##### Attched mode commands
    - docker run <image_name>
    - docker run -p  ports <image_name>
    - docker start -a container_name # restarts an arleady stopped container in attached mode
     

  - #### B) detached mode
  * When you run a Docker container in detached mode, it starts in the background, and the terminal is not attached to the container's streams. 

  * You do not see the container's output directly in your terminal, as it runs in the background.
  * Instead, Docker provides you with the container's ID or name as output.
  * You can continue using your terminal without being blocked by the container's output. 
  * The container runs in the background until explicitly stopped.
* You can view the container's logs at any time using the docker logs container_id_or_name> command.

     ##### detatched mode commands
    - docker run -d <image_name>
    -  docker run -p ports -d <image_name>
    - docker start image_name
     

    ```
    You can run docker attach container_name to re-attached the detached running container.
    To see future logs of a detached container you can run docker logs -f container_name

    * By default, if you run a Container without -d, you run in "attached mode".
    If you started a container in detached mode (i.e. with -d),
    you can still attach to it afterwards without restarting the Container with the following command: docker attach CONTAINER attaches you to a running Container with an ID or name of CONTAINER.
    ```

### 4) Entering Interactive mode
* When you run a Docker container interactively, you are able to interact with it directly through your terminal, allowing you to provide input to the container's processes and view their output in real-time. eg if the code needs you to input number x and y for some manipulation, interactive mode gives you the option for inputting those numbers.

        docker run -it <image_name>

        -i or --interactive: Keep STDIN open even if not attached.
        -t or --tty: Allocate a pseudo-TTY (terminal) to the container.

* By using these flags together (-it), you instruct Docker to allocate a pseudo-TTY and keep STDIN open, allowing you to interact with the container's processes via your terminal.

* Running a Docker container interactively is useful for tasks such as debugging, testing, or running command-line applications within the container. It allows you to have direct control over the container's execution and provides a way to troubleshoot issues or perform tasks within the container's environment.

``` 
If you run a Docker container interactively and the execution completes, the container will stop and exit .

When a container stops, it transitions to a "stopped" state. The docker ps command, by default, only shows running containers, and so that container won't appear since it's stopped. To view all containers, including stopped ones, you can use the -a or --all flag with docker ps:

```

* <b> The alternative way is to run docker start in attached mode:

```
    docker start -a -i container_name

    With this, the container will continue in the active state even after the execution is finished.
```        



### 5) Deleting images & containers
```You cannot remove a running container ```

* docker rm container_name1 container_name2 container_name3 ....container_namex : This command removes one or multiple containers

* docker run ---rm image_name: The --rm flag in Docker is used to automatically remove the container after it exits. When you run a container with the --rm flag, Docker will delete the container and its filesystem as soon as it stops running, whether it exits successfully or encounters an error.

* docker rmi imageID : This command allows you to specify which specific images you want to remove by providing their image IDs or tags. It gives you finer-grained control over the deletion process, allowing you to selectively remove images based on your requirements.
```
You only remove images for non-existence containers. if the container is stopped or active then you cannot remove it's respective images

```

* docker image prune: This command removes all unused images in one go, without requiring you to specify which images to delete. unused Docker images are images that are not referenced by any containers

### 6) images
* docker images : prints out a list of all images that we have

* NB: When you observe the size of the docker image file, the images appear signigicantly larger than the main code because of:

```
    When you run docker build . Docker pulls the base image defined in the DockerFile (e.g., FROM ubuntu or FROM alpine), from a Docker registry (such as Docker Hub) if it's not already available locally on your system. This base image serves as the starting point for your Docker image and provides the foundation for your application.
    
     These base images provide the foundation for your application but come with additional utilities and libraries that may not be directly related to your application's functionality. As a result, the base image contributes to the overall size of the Docker image.
```

- To mitigate the issue of large Docker image sizes, consider the following best practices:
```
    Use slim base images: Choose base images that are optimized for size, such as Alpine Linux, which is known for its small footprint.
    use .dockerignore files to exclude unnecessary files and directories from the build context.
```

* docker image inspect <image_name_or_id> :  display detailed information about one or more Docker images. It provides a JSON representation of various attributes and metadata associated with the specified image(s), including configuration, history, labels, and more.

```
If you want to inspect multiple images at once, you can specify multiple image names or IDs separated by spaces:

docker image inspect <image1_name_or_id> <image2_name_or_id> ...

```

### 7) Copying files into and from a container.

The `docker cp` command is used to copy files and directories between a Docker container and the local filesystem. It allows you to transfer files to and from a running or stopped container, similar to how you would use the `cp` command in a traditional filesystem.

Here's the basic syntax of the `docker cp` command:

```bash
docker cp <source_path> <container_name_or_id>:<destination_path>
```

This command copies the file or directory located at `<source_path>` on the local filesystem to `<destination_path>` within the specified Docker container (`<container_name_or_id>`).

To copy files or directories from a container to the local filesystem, simply reverse the source and destination paths:

```bash
docker cp <container_name_or_id>:<source_path> <destination_path>
```

You can also use `-a` or `--archive` flag to copy files or directories with archive mode (permissions and timestamps preserved):

```bash
docker cp -a <source_path> <container_name_or_id>:<destination_path>
```

Here are some examples:

- Copy a file from the local filesystem to a running container:
  ```bash
  docker cp file.txt my_container:/path/to/destination/file.txt
  ```

- Copy a directory from a running container to the local filesystem:
  ```bash
  docker cp my_container:/path/to/source/directory /path/to/destination/directory
  ```

- Copy a file from a stopped container to the local filesystem:
  ```bash
  docker cp my_stopped_container:/path/to/source/file.txt /path/to/destination/file.txt
  ```

The `docker cp` command provides a convenient way to transfer files between the host machine and Docker containers, facilitating tasks such as data backup, configuration management, and debugging.

### 7) Naming & Tagging Containers and Images
<h3 style="text-align:center; color:green; text-transform:uppercase"> Image Tagging</h3>
<p> When you run docker images to list images, you will realize that in some images the under the tag section reads as < none >. This is because the images are untagged. </p>

<p> so what is docker image taggging? </p>

```
Think of Docker image tagging as the process of assigning a label or identifier or a name to a Docker image.  Tags are used to uniquely identify different versions of an image, allowing users to reference and use specific versions as needed.
```
<p> So how do we assign the docker image tags ? </p>

* When you build a Docker image using the docker build command, you can assign a tag to that image using the -t or --tag option followed by the desired tag name. For example:


```
docker build -t myimage:latest .
```
<emp> Don't forget the  . above in the above command <emp>

Docker image tagging indeed includes two parts: the image name and the tag. When tagging a Docker image, you specify both the name of the image and the tag separated by a colon (:).

For example, in the command: <code>docker build -t myimage:latest </code>.

* myimage is the name of the image.
* latest is the tag assigned to that image.

```
The combination of the image name and the tag uniquely identifies a specific version or variant of the Docker image. You can think of it as a version control mechanism for Docker images, where the tag signifies a particular version, release, or variant of the image.

example: node:14 , node:12, node:10 ,etc
```



* In this example, myimage is the name of the image, and latest is the tag assigned to it. The tag can be any string, but it's common practice to use semantic versioning eg v2.0.0 or descriptive labels to indicate the version or purpose of the image.

* Once tagged, Docker images can be pushed to a registry using the docker push command, and they can be pulled from the registry using the docker pull command, with the tag specifying which version of the image to retrieve.

* Tagging is essential for managing and versioning Docker images, especially in environments where multiple versions of an application are deployed simultaneously or where images need to be easily identifiable for deployment, testing, and rollback purposes.

```
To test:  manouvre to the folder with your code and run docker built -t sample:latest .

After the build process is done, run docker images:
you will realize that the under the Repository is your docker firstname: and under the TAG is the version 

```

```
  Now you can use the docker image name as 
  docker run -p 3000:80 -d --rm --name goalsapp goals:latest

  NB: this command means, create the container and portfward port 80 through 3000, 
  --rm means after the container is closed or stopped delete it
  --name gives our container a name of "goalsapp"
  -- goals:latest is our image name
```

<h3 style="text-align:center; color:green; text-transform:uppercase"> Docker container Naming</h3>

<h4><b><i>
<pre>
  When you run docker run <image_id>, docker will create a container for you with a random name. 
  When you run docker ps, on the list of containers and the names section you realize docker has a chosen a random name for you since you didn't instruct it to give your container a name when building.   
 While Docker containers themselves don't have tags, you can still add names in the following methods:</h4></b></i>

<ol> 
  <li> 
    <span style="font-size:16px"><b>Naming Containers</b></span> : When running a container with the docker run command, you can use the --name option to specify a custom name for the container. For example: <br/>
    <code> docker run --name mycontainer myimageID </code> <br/>
    <code> docker run -p 3000:80 -d --rm  --name mycontainer myimageId </code>
    <p>This assigns the name "mycontainer" to the container instance. </p>
    <p> Now you can use the container name as  <code> docker stop container_name </code> </p>
  </li>

  <li><b>Labels </b>: Docker containers support labels, which are key-value pairs used to attach metadata to containers. You can add labels to containers during creation or while the container is running using the docker container label command.
   </li> 
</ol>


### 8) Sharing images

```
    Everyone who has an image, can create containers based on the image. Now they can share these images in the following manner

```
1) Share a Dockerfile - the dockerfile instructions might need sorrounding files/ folders eg source code.  Then he can run <code> docker build . </code> to create a container
2) share a built image -- So long as the image is published on docker hub then that image can be downloaded and a container ran based on it. eg for the <i>node image </i>  , running <code>docker build node</code> will download this image from the docker hub and create a container based on it.
No <code>docker build . <code> or in short build step is needed here since everything is included in the image














