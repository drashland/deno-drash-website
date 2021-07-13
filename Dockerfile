####################################################################################################

FROM node:14 as dependencies
WORKDIR /usr/src/app
COPY ./package.json .
RUN yarn install

####################################################################################################

FROM node:14 as builder
ARG APP_ENV
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .

# Compile the Vue routes and the webpack bundles
RUN yarn compile:vue-routes
RUN yarn webpack:${APP_ENV}

####################################################################################################

FROM denoland/deno:distroless
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/assets ./assets

# Copy only required files for this app to run
COPY app.ts .
COPY configs.js .
COPY deps.ts .
COPY server.ts .
COPY src/response.ts src/response.ts

# Copy only required directories for this app to run
COPY src/resources src/resources
COPY src/views src/views

CMD [ "cache", "app.ts" ]

EXPOSE 1445

CMD [ "run", "--allow-net", "--allow-read", "app.ts" ]
