FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_PORT=3000
ENV APP_STORAGE=mongodb
ENV MONGODB_URL=mongodb://localhost:27017
ENV MONGODB_DB=noteapp

EXPOSE ${APP_PORT}

CMD [ "node", "build/app.js" ]
