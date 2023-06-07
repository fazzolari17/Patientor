FROM node:16 as build-stage

WORKDIR usr/src/app

COPY . .

RUN npm install husky -g && \
  npm install eslint-plugin-prettier@latest --save-dev && \
  npm install && \
  npm run build

FROM node:16

WORKDIR usr/src/app 

COPY --from=build-stage --chown=node:node /usr/src/app/build /usr/src/app/build

RUN npm install -g serve

CMD ["serve", "-s", "build"]