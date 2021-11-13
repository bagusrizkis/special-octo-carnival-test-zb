FROM node:16.10.0
WORKDIR /src/backend-app-test
COPY . .
RUN npm install
CMD [ "npm", "start" ]