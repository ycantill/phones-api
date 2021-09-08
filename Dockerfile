# Image
FROM node:14

# Create app directory
WORKDIR /usr/src/phones-api

# copy package files
COPY package.json ./

# install modules
RUN npm install

# Bundle app source
COPY . .

# run application
EXPOSE 2512
CMD [ "node", "server.js" ]