####################################################################################################

FROM node:12 as dependencies
WORKDIR /usr/src/app
COPY ./package.json .
RUN yarn install

####################################################################################################

FROM node:12 as builder
ARG NODE_ENV
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .

# Compile the Vue routes and the webpack bundles
RUN yarn compile:vue-routes
RUN yarn webpack:${NODE_ENV}

####################################################################################################

FROM denoland/deno:alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/assets ./assets

# Copy all required files for this app to run
COPY app.ts .
COPY configs.js .
COPY deps.ts .
COPY server.ts .
COPY src/response.ts src/response.ts

# Copy all required directories for this app to run
COPY assets assets
COPY src/resources src/resources
COPY src/views src/views

RUN deno cache app.ts

EXPOSE 1445

CMD [ "run", "--allow-net", "--allow-read", "app.ts" ]
