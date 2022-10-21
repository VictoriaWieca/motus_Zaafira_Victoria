# syntax=docker/dockerfile:1

FROM node:14.20.0
ENV NODE_ENV=production

WORKDIR /

COPY ["package.json", "package-lock.json*"]

RUN npm install --production

RUN npm install express express-session cookie-parser body-parser jsonwebtoken

COPY . .

CMD [ "node", "auth.js" ]
