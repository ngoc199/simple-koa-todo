import * as Koa from 'koa';
import { makeTodoRouter, makeTodoStorage } from '@simple-koa-todo/todo';
import { db } from './db';
import * as bodyParser from 'koa-bodyparser';

const todoStorage = makeTodoStorage(db);
const todoRouter = makeTodoRouter(todoStorage);

const app = new Koa();

app.use(bodyParser());
app.use(todoRouter.routes());

export { app };
