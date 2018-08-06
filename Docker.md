# Docker Documentation

## Installation

### Docker 

` curl -fsSL get.docker.com -o get-docker.sh `
` sh get-docker.sh `

### Docker Machine

	``  base=https://github.com/docker/machine/releases/download/v0.14.0 &&
		  curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine &&
	    sudo install /tmp/docker-machine /usr/local/bin/docker-machine)) ``
    
### Docker Compose 

	`
	curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
	chmod +x /usr/local/bin/docker-compose
	`



## Images vs Containers

1. An image is the binaries and source code that make up a container
2. A container is an instance of that image running as a process

### Running a Container

#### NGINX

`` docker container run --publish 80:80 nginx ``
	
This command pulls down the nginx image from the server if it does not exist \
locally. Then it runs it in a new container publishing port 80 to the HOSTS \
port 80

We can also run 

`` docker container run --publish 80:80 --detach nginx ``
	
This runs the container in the background. 
The --name switch also allows us to specify our own name for the container

We can check the logs for a container by using the command

` docker container logs <container_name> `
	

Stopping containers can be acheived by using ` docker container stop <ID> `

Removing containers can be acjieved with ` docker container rm <ID> `

`docker container top <name>` - Lists the conainers running processes

` docker container inspect <name> ` - Shows config JSON

` docker container stats ` - Live performance data on all containers
 
## Interacting with Containers Via Terminal

It is also possible to run a shell inside your containers so that you can run an interactive /
shell inside the container to make changes.

To do this we use the **-it** command i.e.

`docker container run -it --name webserver nginx bash `
	
	**NB** Always remember to specify what terminal emulator you want to use
	
### Starting an existing container interactively

It is also possible to interact with a pre-existing terminal by using **-ai** or 
attach, interactively (see below)

` docker container start -ai <container_name> `
	
In order to run a command in an already running container we use

` docker container exec -it <program to run> `
	
&nbsp;
	
	
## Docker Network Concepts for Private/Public Comms

To see what port(s) are exposed on a running containernwe use.

`docker container port <container_name> `
	
Network settings such as IP address can be descovered using the **--inspect** command as below.

	``
	docker container inspect --format \{\{ .NetworkSettings.IPAddress \}\} webhost
	``
	
**NOTE** inspect returns a json object and --format is used to select nodes in the response.

## Docker Networks: Cli Management

1. Show networks - ` docker network ls `
2. Inspect a network - ` docker network inspect `
3. Create a network - ` docker network create --driver `
4. Attech a network to container - ` docker network connect `
5. Detach a network from a container - ` docker network disconnect `

#### Creatings networks & adding containers

We can create a new network which uses the default network driver of bridge with the command

` docker network create my_app_net ` 

and then add a new container to it with

` docker container run -d --name new_nginx --network my_app_net nginx `

#### Add existing container to a new netowrk

We can add existing containers to newly created networks with **docker network connect** as follows

` docker network connect <network_id> <container_id> `

Once part of a network containers can talk to each other by using the container name

` docker container run -d exec -it  <container_name1> ping <container_name_2> `

#### DNS ALIASES

Docker allows you to have dns aliases whereby two or more different containers running within a virtual docker network can all be qieries using the same DNS name.

Use the **--net-alias** command to set the same alias on duplicate containers on your network.

`docker run container -d --network <network_name> --net-alias <alias> --name <container_name> ubuntu:latest `

## Docker Images

### Commands

`docker image ls `
`docker history <name>:<tag>`
`docker image inspect <name>:<tag>`	

### Image Dockerfile Basics

Docker files are recipies for creating docker images and consist of a base os, app installs, command to be run, file copies and configurations, which all make up a desired image.

The most common Docker actions are as follows;

FROM - This is the distribution wich makes the base of the image, debian, centos, alpine etc..
ENV - The is where you declare any enviroment vriable to be used lated in the file
RUN - This specifies bash commands to be run such as apt-get update as well as file copies and other such actions
EXPOSE - This is used to expose ports accessable by the host os
CMD - This can be used to run any command you want when the container first boots


#### Building images from dockerfile

In order to build an image from a dockerfile run,

`docker build -t <tag_name> .`

This means build from the current directory and tag it. Docker will detect the dockerfile and executed the steps within it


