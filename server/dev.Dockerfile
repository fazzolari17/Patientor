FROM node:16.18.1

WORKDIR usr/src/app

COPY . .

RUN npm install && \
  npm rebuild bcrypt -build-from-source && \
  npm install axios --save && \
  npm install --save @types/axios
  # apk del make gcc g++ python 

# RUN npm install bcrypt

CMD ["npm", "run", "dev"]

