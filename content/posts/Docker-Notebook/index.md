+++
date = '2025-10-01T00:00:00-00:00'
draft = false
title = 'Docker Notebook'
+++

## Install Docker Tutorial
[https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)

## Build Dockerfile
```bash
docker build -t my-app:1.0 .
```
Name of the image is `my-app`, tag is `1.0`

## List Images
```bash
docker images
```

## Save Image
Save `your_image_name:tag` to `./your_image_name.tar`
```bash
docker save -o ./your_image_name.tar your_image_name:tag
```

## Load Image
Load `./your_image_name.tar`
```bash
docker load -i ./your_image_name.tar
```
Then check by running 
```bash
docker images
```

## Run Docker with Persistent Data

### Using Docker Volumes
Create persistent data volume
```bash
docker volume create my-app-persistent-data
```
Run docker
```bash
docker run -d -p 8000:8000 --name my-app-instance \
  -v my-app-persistent-data:/app/data \
  my-app
```
### Using Bind Mounts

```bash
mkdir -p ./local-data
cp -r ./data/* ./local-data
docker run -d -p 8000:8000 --name my-app-instance \
  -v "$(pwd)/local-data":/app/data \
  my-node-app
```
