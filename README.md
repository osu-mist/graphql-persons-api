# GraphQL Persons API

Experimental GraphQL Persons API written in Node.js.

## Prerequisite

1. Install Node.js from [nodejs.org](https://nodejs.org/en/).
2. Install Oracle client libraries to your operating system library search path by following [here](https://oracle.github.io/odpi/doc/installation.html).
3. Copy [config-example.json](./config-example.json) as `config.json` and modify as needed.
4. Install dependencies via [npm](https://www.npmjs.com/):

  ```
  $ npm install
  ```

## Usage

Start the API by performing:

```
$ node server.js
```

Now you should be able to access [GraphiQL](https://github.com/graphql/graphiql) IDE at [http://localhost:4000/graphql](http://localhost:4000/graphql)
