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

- Continous Integration (CI/CD)
    - Docker Cloud
    - Docker Cloud Service
    - Github Web hooks
    - Azure/AWS
    - UAT

- Production
    - Docker Cloud
        - Docker Cloud Stack
        - HA proxy
        - Azure


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

## 2. Development Environment:

Install (NodeJS)[https://nodejs.org/en/] and (docker)[https://docs.docker.com/engine/installation/#installation]. 
Now use the (docker file)[https://github.com/spbreed/ngWeatherApp/blob/master/Dockerfile] to run the project.


```
docker build -t ngweatherapp:0.1 .
docker run -d -p 80:80 ngweatherapp:0.1

```

Navigate to http://localhost/ to view the site. Docker team released a new GUI - [Kitematic](https://kitematic.com/) to manage docker containers on OSX and Windows. Open Kitematic to view all the end points, start/stop containers etc.

(Docker Compose)[https://docs.docker.com/compose/]is a tool for defining and running multi-container Docker applications. With Compose, you use a Compose file to integrate all the services including network connections, port settings etc. Then, using a single command, you create and start all the services from your configuration.

Included [docker compose file](https://github.com/spbreed/ngWeatherApp/blob/master/docker-compose.yml) shows how to use [HAProxy](http://www.haproxy.org/#desc), an open source load balancer for TCP/HTTP based websites.
This project uses [haproxy image](https://github.com/docker/dockercloud-haproxy) from docker cloud, that balances between linked containers and, if launched in Docker Cloud or using Docker Compose v2, reconfigures itself when a linked cluster member redeploys, joins or leaves.

```
  lb:
    image: dockercloud/haproxy
    links:
      - web
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    ports:
      - 80:80
```

Now run docker-compose 'up' command to build the application stack based on the compose file

```
docker-compose -f docker-compose.yml up
```

Now web layer within the compose file can be scaled and load balanced with the below command

```
docker-compose -f .\docker-compose.yml scale web=3
```

Now http://localhost will be a load balanced URL and IP address in the header will change with every request.

    
## 3. Continous Integration/Continous Development (CI/CD):

Signup for [docker cloud](https://cloud.docker.com/) and [github](https://github.com) and create a repo on each.

Now push your code to github repo

```
git init
git add -A 
git commit -m 'Initial Commit'
git push

```

Push your docker image to docker cloud

```
docker tag ngweatherapp:0.1 spbreed/ngweatherapp:0.1
docker push spbreed/ngweatherapp:0.1

```
spbreed/ngweatherapp is the repo created in docker cloud. 
![](https://github.com/spbreed/ngweatherapp/images/docker_repo.png)

Now navigate to the docker repo and click 'Launch Service' -> General settings -> Enable Auto redeploy -> Create and Deploy.

Once the service is launched, click 'Services' on the left navigation to view the newly launched service. Under Endpoints copy the container endpoints and paste in the browser. This will launch the website.

##CI

Modern CI pipelines (Jenkins, CircleCI, TravisCI etc) uses [Webhooks](https://developer.github.com/webhooks/) functionalities in Git based source repos to retreive the latest source code and execute the build with each git push.

Docker cloud implements a CI pipeline as well. Autobuild process in Docker repo triggers a new build with every git push to your source code repository.

Click Cloud settings in left navigation -> source providers -> Github and connect to your Github account. 

Now connect your Github repo to Docker cloud repo
Click Repository -> ngweatherapp -> builds -> Configure Automated builds -> Select your Github repo -> Save and build

Now with each Push, the build process will triggered and latest container will be published. (Auto redeploy should be enabled on the service)



