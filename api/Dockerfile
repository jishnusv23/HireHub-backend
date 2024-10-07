FROM  node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -al

RUN npm run build

EXPOSE 2001

CMD [ "npm", "start" ]