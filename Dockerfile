ARG BUILD_VERSION=0.0.0
ARG SCRATCHVM_BUILD_IMAGE=scratchvm:$BUILD_VERSION

# stage 0
FROM $SCRATCHVM_BUILD_IMAGE as vm-stage

# stage 1
FROM node:14-alpine AS build-stage
WORKDIR /usr/src/scratch-gui

# Dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install


# Copy files from scratch VM
RUN rm -rf ./node_modules/scratch-vm
COPY --from=vm-stage /usr/src/scratch-vm ./node_modules/scratch-vm/

# Copy source
COPY . .

# Update version number
RUN npm version $BUILD_VERSION --no-git-tag-version

# Run build
RUN npm run build

# stage 2
FROM nginx:1.20.1 AS run-stage

# copy build files
COPY --from=build-stage /usr/src/scratch-gui/build /usr/share/nginx/html
COPY entrypoint.sh /usr/share/nginx/

RUN chmod +x /usr/share/nginx/entrypoint.sh
ENTRYPOINT ["/usr/share/nginx/entrypoint.sh"]

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
