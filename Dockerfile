FROM node:14-alpine

# ENV NODE_ENV=production
WORKDIR /usr/src/scratch-gui


COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent 
RUN npm install

# Copy files from scratch VM
RUN rm -rf ./node_modules/scratch-vm
COPY --from=scratchvm:latest /usr/src/scratch-vm ./node_modules/scratch-vm/

# COPY ../ dest
COPY . .

EXPOSE 80

# RUN chown -R node /usr/src/scratch-gui
# USER node

CMD ["npm", "start"]
