# Drash Land Website

## Requirements

Please ensure you have the following installed 

- Node v14.x (latest): https://nodejs.org/en/download/
- Deno v1.x (latest): https://deno.land

## Running The Development Environment

1. Install `yarn` CLI.

```
npm install -g yarn
```

2. Install dependencies.

```
$ yarn install
```

3. Compile the Vue Router routes files.

```
$ yarn compile:vue-routes
```

This will create the routes files for the webpack bundles to use.

4. Run webpack in `watch` mode.

```
$ yarn run webpack:development --watch
```

`watch` mode allows webpack to recreate bundles on file changes.

5. Run the server.

```
$ yarn server
```

## Scripts

All scripts below can be run using `yarn <script>`. There are more scripts listed in `package.json`, but these are the pertinent ones.

```
Script               Description

compile:vue-routes   Compile all Vue router routes files. These route files are used by the webpack bundles.
docker:production    Build, tag, and push the production Docker image to the registry. (requires Docker login credentials)
docker:staging       Build, tag, and push the staging Docker image to the registry. (requires Docker login credentials)
server               Run the server.
webpack:development  Build the webpack bundles for the development environment.
webpack:production   Build the webpack bundles for the production environment.
webpack:staging      Build the webpack bundles for the staging environment.
```

## Technology Stack

- [Deno](https://deno.land) - For the runtime.
- [Drash](https://drash.land) - For the server.
- [Vue](https://vuejs.org) - For the front-end framework.
- [Vue Router](https://router.vuejs.org/) - For front-end routing.
- [denon](https://github.com/denosaurs/denon) - To restart the server on file changes.
- [pug](https://pugjs.org/api/getting-started.html) - To allow for a minimal HTML syntax.
- [webpack](https://webpack.js.org/) - For bundling Vue components.
