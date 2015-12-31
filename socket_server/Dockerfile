FROM node

RUN mkdir app

WORKDIR app

ADD . /app/

RUN npm install

EXPOSE 8083

CMD ["npm", "start"]
