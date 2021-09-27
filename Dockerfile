# stage 1
FROM node:14-alpine AS build-stage

# ENV NODE_ENV=production
WORKDIR /usr/src/scratch-gui


COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent 
RUN npm install

# Copy files from scratch VM
RUN rm -rf ./node_modules/scratch-vm
COPY --from=scratchvm:latest /usr/src/scratch-vm ./node_modules/scratch-vm/

# Copy source
COPY . .

# Run build
RUN npm run build

# stage 2
FROM nginx:1.20.1 AS run-stage

# copy build files
COPY --from=build-stage /usr/src/scratch-gui/build /usr/share/nginx/html

EXPOSE 80
