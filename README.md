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

## 1. Front End:
This project uses [gulp angular generator](https://github.com/Swiip/generator-gulp-angular) open source Yeomen library to build AngularJS based NodeJS application. FountainJS takes care of wiring AngularJS, NodeJS, Gulp, Webpack, ESLink, Karma, BrowserSync etc during start of the project. There are few other generators out there like [mean.io](http://mean.io/), [mean.js](mean.js), which are pretty robust and provides default MongoDB integration. This project deals only with scaling front end and hence gulp angular generator is used throughout this project. 
After installing Docker and NodeJS on your machine run the below scripts to start your project

```
git clone https://github.com/spbreed/ngWeatherApp.git

cd ngWeatherApp

npm install

bower install

```
To serve the files directly from the /src directory for develpment environments run the below script and navigate to http://localhost:80

```
gulp serve
```

For production environment its recommened to minify and uglify your javascript/css files in /dist directory. Now for production serve from /dist

```
gulp build

gulp serve:dist
```

So far front end work is complete. Gulp Angular Generator uses BrowserSync to serve the html page. To serve it from NodeJS server, add server.js based on ExpressJS. Header section (src\app\componenents\navbar\navbar.html) of the application shows the IP address of host. Using client side code would not retrive the ip address of the host, so a server side NodeJS library [dns](https://www.npmjs.com/package/dns) is used to get the host address and also to host to the site.

```
node server.js 

(or)

npm start

```

## 2. Development:

 



    

