
FROM node:lts-buster 

WORKDIR usr/src/app

COPY . .

RUN npm install husky -g && \
  npm install eslint-plugin-prettier@latest --save-dev && \
  npm install 

CMD ["npm", "start"]