# Things to watch out for when pushing to production
1) Bind mounts shouldn't be used in production
2) containerzied apps <b>might</b> need a` build `step eg react.js
3) multi-container projects might need to be split(or should be split) across multiple hosts/machines
4) trade-offs between control and responsibility might be worth it.


# DEPLOY CONTAINERS TO AWS
## 1 **Installing docker on AWS**

1) Create an instance on AWS
2) connect via ssh key to the AWS instance.

NB: Please note that the following command  will unfortunately not work anymore:

`amazon-linux-extras install docker`

Instead, use this approach / these commands:

    1) sudo yum update -y
    2) sudo yum -y install docker
    
    3) sudo service docker start
    
    4) sudo usermod -a -G docker ec2-user
    Make sure to log out + back in after running these commands.

    Once you logged back in, run this command:

    5) sudo systemctl enable docker
    Thereafter, you can check whether Docker is available by running:

    6) docker version
    Also see: https://stackoverflow.com/questions/53918841/how-to-install-docker-on-amazon-linux2/61708497#61708497


## **2 pushing local image docker to cloud**

### option 1 - Deploy source code to aws instance

1) Deploy source code to EC2 instance
2) Build image on the instance machine
3) push source code to remote machine, run `docker build` and then `docker run`
 
 NB: overall the above is adds too unneccessary complexity

 ### option 2 - Deploy Built image

 1) Build image before deployment on local machine  - `docker run`
 2) push it to docker  hub
 3) login to you `AWS Instance` via **ssh**. Then  pull the image from the docker hub on AWS - `docker run containerTagName `
 4) Run `docker ps -a` or `docker ps` to see if container is started.

 Just run all the commands you run on the normal linux.

 - Now once the container is up and running and assuming you are on a **NodeJs** instance in this case, to connect through it via the browser.

    - Go to the instances.
    - Click on that specific instance
    - check the `security group` and make sure the `inbound rules` contain a **policy** to **Allow http** from all parts of the world. if not:

        - Go to **security bounds** section. 
        - click on that security and select **inbound rules**
        - click on **Edit inbound rules**
        - **ADD rule** for allowing security inbounds
        - click on save
    - go back to the public ip and refresh on the browser


### Managing & Updating the container/image on aws

1) Rebuild the image with your changes
2) push it to docker hub
3) log in to the aws environment via ssh and run `docker pull imagename`
4) Rerun the new image

    ### disadvantages of this 

    - Not ideal for large applications with large containers



