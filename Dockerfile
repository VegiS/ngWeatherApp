# Use latest node as the base image
FROM node:argon

#Add maintainer of this Docker file
MAINTAINER karthik.ramamoorthy@outlook.com

# Create app directory
RUN mkdir -p /usr/src/app

#Set working directory for docker daemon
WORKDIR /usr/src/app

#First install the required packages
COPY ./package.json /usr/src/app
RUN npm install --only=production

#Then copy all the source code
COPY ./dist /usr/src/app/dist
COPY ./server.js /usr/src/app

EXPOSE 80
#Set default comment on start
CMD ["npm","start"]


#docker build -t ngweatherapp:0.1 .
#docker run -d -p 80:8080 ngweatherapp:0.1
