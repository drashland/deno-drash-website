# Drash Land Website

## Table Of Contents

- [Requirements](#requirements)
- [Running The Development Environment](#running-the-development-environment)
- [Setting Up An Environment](#setting-up-an-environment)
  - [Build The Environment](#build-the-environment)
  - [Run The Environment Online](#run-the-environment-online)
- [Scripts](#scripts)
- [Technology Stack](#technology-stack)

## Requirements

- Node v12.x (use this version to prevent `node-sass` errors)
- Deno v1.x+

## Running The Development Environment

1. Install npm dependencies.

```
$ npm install
```

2. Run webpack.

```
$ npm run webpack:development
```

3. Run the server.

```
$ npm run server
```

## Setting Up An Environment

In the event you want to build an environment (e.g., staging, production, QA),
you will need to take the following steps:

### Run The Environment Online

1. Set up a web server to handle serving the website application. The website
   application runs on `localhost:1445`.

   - For Apache: https://github.com/drashland/website/blob/main/apache.conf
   - For Nginx: _In progress_

2. Install [PM2](https://pm2.keymetrics.io/).

3. Install dependencies:  `npm i`

4. Make a copy of `ecosystem.config.sample.js` to `ecosystem.config.js`.
   
5. Build bundles: `npm run webpack:development #  or :production`

6. Run (or restart if PM2 is already running) PM2. PM2 will use your `ecosystem.config.js` file to start the website
   application and keep your application online 24/7.

```
$ pm2 start

[PM2] Spawning PM2 daemon with pm2_home=/home/someone/.pm2
[PM2] PM2 Successfully daemonized
[PM2][WARN] Applications Drash Land (localhost:1445) not running, starting...
[PM2] App [Drash Land (localhost:1445)] launched (1 instances)
┌─────┬────────────────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name                           │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼────────────────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ Drash Land (localhost:1445)    │ default     │ N/A     │ fork    │ 228260   │ 0s     │ 0    │ online    │ 0%       │ 24.8mb   │ someone  │ enabled  │
└─────┴────────────────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

## Scripts

### build

- `npm run compile:vue-routes`

  Compiles all Vue routes for all modules.

### server

- `npm run server`

  Starts the server.

### webpack:development

- `npm run webpack:development`

  Runs webpack in development mode.

### webpack:production

- `npm run webpack:production`

  Runs webpack in production mode.

## Technology Stack

- [Deno](https://deno.land)
- [Drash](https://drash.land)
- [Vue](https://vuejs.org)
- [denon](https://github.com/denosaurs/denon)
- [pug](https://pugjs.org/api/getting-started.html)
- [webpack](https://webpack.js.org/)
