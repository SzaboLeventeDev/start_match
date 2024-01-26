# choose node version
FROM node:18.16.0

# add working directory
WORKDIR /usr/src/app

# copy package.json
COPY package*.json ./
RUN npm ci

# copy source code into the container
COPY . .

#translate to js from ts
RUN npm build

# add port
EXPOSE 8080

#start application
CMD ["node", "dist/index.js"]