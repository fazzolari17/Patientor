FROM --platform=linux/amd64 node:16.18.1

WORKDIR ./

COPY . .

RUN npm install && \
  npm rebuild bcrypt -build-from-source && \
  npm install axios --save && \
  npm install --save @types/axios

CMD ["npm", "start"]

