FROM node:16.18.1

WORKDIR /usr/src/app

COPY . .

RUN npm install && \
  npm rebuild bcrypt -build-from-source && \
  npm install axios --save && \
  npm install --save @types/axios && \
  npm run build

EXPOSE 3001

CMD ["npm", "start"]

