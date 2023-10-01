
FROM node:16

WORKDIR usr/src/app

COPY . .

RUN npm install husky -g && \
  npm install eslint-plugin-prettier@latest --save-dev --legacy-peer-deps && \
  npm install 

CMD ["npm", "run", "dev"]