FROM node:16-alpine

WORKDIR /home/node/app

COPY ./package*.json .

RUN npm install

RUN npm install -g nodemon

COPY  . .

EXPOSE 3000

CMD ["npm", "run", "task6"]