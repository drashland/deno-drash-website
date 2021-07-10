FROM node:12 as deps
WORKDIR /usr/src/app
COPY package.json .
RUN yarn install

FROM node:12 as builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app .
COPY . .
RUN yarn compile:vue-routes
RUN node console/compile_vue_routes.js

FROM hayd/alpine-deno
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
EXPOSE 1445
RUN deno cache app.ts
CMD [ "run", "--allow-net", "--allow-read", "app.ts" ]
