FROM node

RUN apt-get update

RUN apt-get install -y GraphicsMagick

RUN mkdir app

WORKDIR app

ADD . /app/

RUN npm install

EXPOSE 7878

CMD ["npm", "start"]
