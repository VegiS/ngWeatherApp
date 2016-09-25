#Scalable AngularJS + NodeJS web apps using #DockerCloud and #DockerCompose

Technologies and Frameworks
- Front End
    - AngularJS + NodeJS Yeoman templates using FountainIO
    - Gulp for build and source distribution
    - OpenWeather API for backend
    - ExpressJS for serving webpages and server side API

- Dev Environment
    - NodeJS on Windows 10
    - Docker on Windows
    - Docker Compose
    - HA proxy for load balancing

- Production Environment
    - GitHub
    - Docker Cloud
        - Docker Cloud Service
        - Docker Cloud Stack
        - HA proxy
        - Azure
    - Continous Integration
        - GitHub + Docker Cloud

#Overview:
This project is to demonstrate how to acheive scaling of dockerized NodeJS apps using HAProxy hosted in local Docker environment and Docker cloud (formerly called as Tutum). The application is a Weather App built using AngularJS and used OpenWeather Api to retreive weather data. Continous Integration/Continous Deployment is acheived through combination of Github and Docker Cloud Build automation functionalites.

##Front End:
This project uses [fountainjs.io](http://fountainjs.io/) open source Yeomen library to build AngularJS based NodeJS application. To get started execute the below commands





    

