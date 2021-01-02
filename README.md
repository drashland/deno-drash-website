# Drash Land Website

## Table Of Contents

* [Requirements](#requirements)
* [Development Work](#development-work)
* [Setup  For Staging/Production](#setup-for-stagingproduction)
* [Building A New Release Version](#building-a-new-release-version)
* [Updating Staging/Prod](#updating-stagingprod)
* [Technology Stack](#technology-stack)

## Requirements

* Node v12.x (use this version to prevent `node-sass` errors)
* Deno v1.5.4+

## Development Work

**What**

- This compiles the vue routes for the modulee you will be working on and watches it
- Bundles the vue code for the module, setting it as the latest major release

**Why**

For when you are working on a feature, or investigating.

**How**

1. Build the documentation. For example if i was goingto work on drash:

```
$ npm run build:docs development drash
```

2. Run the development server.

*Note: This will have to be in a separate shell as you are watching webpack*

```
$ npm run dev:server
```

3. Start coding!

4. Run `npm run build:docs production` and commit the bundled file changes, to ensure the documentation changes are saved

## Setup For Staging/Production

1. Set up a web server to handle serving the website application. The website application runs on `localhost:1445`.

    * For Apache: https://github.com/drashland/website/blob/main/apache.conf
    * For Nginx: _In progress_

2. Install [PM2](https://pm2.keymetrics.io/).

3. Run `npm run build:ecosystem`, this will:
 - install NPM  dependencies
 - Rebuild `node-sass`
 - Create an `ecosystem.config.js` from `ecosystem.config.sample.js` Make a copy of `ecosystem.config.sample.js` to `ecosystem.config.js`.

3. Run PM2. PM2 will use your `ecosystem.config.js` file to start the website application and keep your application online 24/7.

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

## Building A New Release Version

This is for creating a new bundle for a module, when you wish to create a new release, for example, say you hav started working on Drash v2.0.0 docs, you will need to create a new bundle so you don't override the v1.x bundle

1. Add the version to the `versions` property in `configs.js`, eg add `"v2.x"` above `"v1.x"`

2. Build the new bundle: `npm run build:docs`

3. Now any current work done will be bundled into that v2.x file, and the v1.x file will be left untouched

## Updating Staging/Prod

Once master has your new changes, you now need to:

1. ssh onto the server

2. Pull the latest of main

3. `pm2 restart 0`. Should this not work, do `pm2 kill && pm2 start`

## Technology Stack

* [Deno](https://deno.land)
* [Drash](https://drash.land)
* [Vue](https://vuejs.org)
* [pug](https://pugjs.org/api/getting-started.html)
* [webpack](https://webpack.js.org/)
