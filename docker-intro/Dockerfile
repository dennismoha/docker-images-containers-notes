# Use an official Node.js runtime as the base image
# this image is from the docker hub or if pulled from the docker hub into your machine, that's the image that will get used
FROM node:14

# Set the working directory in the container
# this tells docker after copying all the files below, all other subsequent commands eg npm install should be ran on the code inside this folder
WORKDIR /app

#  Copy the rest of the application code to the working directory
# the first part of the copy `COPY .` is the folder path of where docker should  fetch the code files to include in the image
# the second part `/app` is the path inside of the image where those files should be stored
# in the copy below, all the files in this root folder will be copied in the /app folder and if the folder is not created docker will create it

COPY package.json /app

# Install npm dependencies
# this is executed only everytime an image is created
RUN npm install

COPY . /app

# Expose a port that the container will listen on
# since a docker container is completely ostracized from your system, we can't be able to reach it through localhost:3000 on the browser
# So this command tunnels the docker traffic on port 3000 to the system port 4000 or whatever so that you can be able to reach it through localhost.
# NB: Additional steps are required when running the container to actually publish the exposed ports which is docker run -p systemport imageID: 
# this is optional t documents that a process in the container will expose this port. But you still need to then actually expose the port with -p when running docker run
# 
EXPOSE 3000

# Define the command to run the application when the container starts
# this is executed everytime a container based on this image is started 

CMD ["node", "app.js"]
