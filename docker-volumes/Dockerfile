FROM node:14

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 80

# the path inside of the container which should be mapped to some folder outside the container where the data should survive

VOLUME [ "/app/feedback" ]

CMD [ "node","server.js" ]

