# Cuvantul Zilei REST API
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![npm version](https://badge.fury.io/js/express-rest-es2017-boilerplate.svg)](https://badge.fury.io/js/express-rest-es2017-boilerplate) [![Build Status](https://travis-ci.org/danielfsousa/express-rest-es2017-boilerplate.svg?branch=master)](https://travis-ci.org/danielfsousa/express-rest-es2017-boilerplate) [![Coverage Status](https://coveralls.io/repos/github/danielfsousa/express-rest-es2017-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/danielfsousa/express-rest-es2017-boilerplate?branch=master)

RESTful API for cuvantulzilei.ro/api

## Features

 - No transpilers, just vanilla javascript
 - ES2017 latest features like Async/Await
 - CORS enabled
 - Consistent coding styles with [editorconfig](http://editorconfig.org)
 - Gzip compression with [compression](https://github.com/expressjs/compression)
 - Linting with [eslint](http://eslint.org)
 - Continuous integration support with [Netlify](https://netlify.org)
 - todo: API documentation generation with [apidoc](http://apidocjs.com)
 - todo: Monitoring with [pm2](https://github.com/Unitech/pm2)

## Requirements

 - [Node v14](https://nodejs.org/en/download/current/)
 - [npm](https://npm.com/en/docs/install)

## Getting Started

#### Clone the repo:

```bash
git clone https://github.com/Cuvantul-Zilei/cz-api.git
cd cz-api
```

#### Install dependencies:

```bash
npm install
```

#### Set environment variables (optional)

```bash
cp .env.example .env
```

## Running Locally

```bash
npm run dev
```

## Documentation (todo)

```bash
# generate and open api documentation
yarn docs
```

## Deploy

Deployments are automatically synced with branch `prod`


## Inspiration

 - [Build a REST API with Node JS and Express | CRUD API Tutorial](https://www.youtube.com/watch?v=l8WPWK9mS5M)
 - [danielfsousa/express-rest-boilerplate](https://github.com/danielfsousa/express-rest-boilerplate)
 - [KunalKapadia/express-mongoose-es6-rest-api](https://github.com/KunalKapadia/express-mongoose-es6-rest-api)
 - [diegohaz/rest](https://github.com/diegohaz/rest)

## License

[MIT License](README.md)
