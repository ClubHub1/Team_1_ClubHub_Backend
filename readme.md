# CHBackend

> clubhub backend API for database interaction

## About

This project uses [Feathers](http://feathersjs.com). An open source framework for building APIs and real-time applications.

To build feathers project use npm create feathers@latest <your repo name>

Easiest to do this from within a docker container built on top of node-alpine, see Team_1_Clubhub Repository for docker compose file to build network
between frontend, backend, database

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/CHBackend
    npm install
    ```

3. Start your app

    ```
    npm run compile # Compile TypeScript source
    npm run migrate # Run migrations to set up the database
    npm start
    ```

## Testing

Run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

This app comes with a powerful command line interface for Feathers. Here are a few things it can do:

```
$ npx feathers help                           # Show all commands
$ npx feathers generate service               # Generate a new Service
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
