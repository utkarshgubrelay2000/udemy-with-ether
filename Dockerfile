FROM node:latest


RUN mkdir -p /usr/local/src
COPY . /usr/local/src
WORKDIR /usr/local/src

RUN npm install

RUN npm run build

CMD ["npm", "run",  "start"]
