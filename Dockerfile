FROM node:18-alpine

ARG PORT=5000
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:${PORT}
ARG NEXT_PUBLIC_API_URL=https://opentdb.com

WORKDIR /app

COPY . .  

RUN npm install

RUN npm run build 

CMD [ "npm","run","start" ]