# syntax=docker/dockerfile:1

FROM node:14.20.0
ENV NODE_ENV=production

WORKDIR /

COPY ["package.json", "package-lock.json*"]

RUN npm install --production

COPY . .

CMD [ "node", "script.js" ]
