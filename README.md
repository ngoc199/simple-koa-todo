# Simple Koa Todo

This is the simple CRUD todo application.

This project is the proof of work for implementing the basic Koa framework features using functional programming.

## Technologies

- [Koa framework](https://koajs.com/)
- [Knex](https://knexjs.org/) as the query builder
- [Jest](https://jestjs.io/) for testing
- [Supertest](https://github.com/visionmedia/supertest#readme) for api integration testing

## Commands

### `yarn nx serve web`

Run the application. The application will be run on port 4000 by default if `process.env.PORT` is undefined.

### `yarn nx test web`

Test the application using `Jest` and `Supertest`

### `yarn migrate:web <name>`

Create new migration with the specified name. The migration is used to modified the database schema.

### `yarn up:web`

Apply the latest migration to update the database schema.

### `yarn down:web`

Undo the latest migration to reverse the database schema changes.

## Author

- Ngoc Nguyen: [Twitter](https://twitter.com/ngocoder) | [Linkedin](https://www.linkedin.com/in/ngocoder/)
