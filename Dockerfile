FROM node:latest

WORKDIR /usr/src/app/gateway

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]