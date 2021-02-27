---
date: "2021-02-27"
title: "Deploy an ASP.NET & React app to Heroku using Docker"
description: "Build a mini blog with React Redux "
tags: ["ASP.NET", "Docker", "Heroku", "Hosting"]
---

I am learning C# and ASP.NET recently and decided to build a full-stack application using ASP.NET as my backend, and React Redux as my frontend. After I had the basic things working, I realized that I need to find a way to host and deploy my application. And it's not very straightforward in the beginning, compare to what I've done before with Node.js apps. Cloud providers like DigitalOcean, Heroku etc., all support Node.js out of the box, but not for .NET. I have no plan to deeply dive in to setting up a Windows VM and IIS on the server, or use Azure, my simple need is to be able to see my project hosted somewhere.

After some research, I found the best way for me to do is to use Docker containers and host on Heroku with the free tier, perfect for this kind of personal project!  

In this article, I'll share how to deploy an ASP.NET and React application, using .NET 5.0 and create-react-app.

## First, let's create an application

I use the React-with-Redux template in Visual Studio, the official documentation is [here](https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/react-with-redux?view=aspnetcore-5.0). But regardless the frontend technology, it does not change how we deploy with Docker and should also work with all the steps shared in this article.

## Publish the application

Navigate to the directory where your `.sln` file is and run the commands. This will create a `Release` folder inside the `bin` folder.
```bash
dotnet publish -c Release
```


## Dockerfile

Next, create a `Dockerfile` without any file extension, and place in the `publish` folder under `./bin/Release/net5.0/pulish` . Use the content below in the Dockerfile. My app uses `.NET 5.0` , but you can find the correct docker images at this link, [.NET Runtime](https://hub.docker.com/_/microsoft-dotnet-runtime) , to match your .NET version. Remember to rename `your-app-name.dll` to your project name.

```bash
# Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS runtime
WORKDIR /app
COPY . .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet your-app-name.dll
```

## Build the docker container

In your terminal, `cd` into the project folder which contains `bin` and type the following commands. Now, you should see the image listed in your docker desktop application.

```bash
docker build -t your-app-name ./bin/Release/net5.0/publish
```

## Create an app in Heroku

It's time to get ready to deploy. Go to Heroku's website, create an app and choose container-registry as method. Back to your terminal, we now need to sign-in in the CLI, using:

```bash
heroku login
heroku container:login
```

## Push container to Heroku

Once signed in, `cd` into the folder which contains the `Dockerfile` and run:

```bash
heroku container:push -a your-app-name web
```

## Release to Heroku container

Finally, run the commands to release to Heroku. 

```bash
heroku container:release -a your-app-name web
```

Your application is now live! Check to see at [https://your-app-name.herokuapp.com](https://your-app-name.herokuapp.com/).

## References

Tutorials

- [https://dev.to/alrobilliard/deploying-net-core-to-heroku-1lfe](https://dev.to/alrobilliard/deploying-net-core-to-heroku-1lfe)
- [https://medium.com/faun/deploy-net-core-api-to-heroku-for-free-2f7f651932c4](https://medium.com/faun/deploy-net-core-api-to-heroku-for-free-2f7f651932c4)
- [https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-3.1](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-3.1)
- [https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/react-with-redux?view=aspnetcore-5.0](https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/react-with-redux?view=aspnetcore-5.0)

Docker

- [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
- [https://hub.docker.com/_/microsoft-dotnet-runtime](https://hub.docker.com/_/microsoft-dotnet-runtime)