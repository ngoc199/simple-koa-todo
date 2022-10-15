import * as Router from '@koa/router';
import { Context } from 'koa';
import { TodoIdGenerator } from './todo.id.generator';
import { TodoRecord } from './todo.record';
import { TodoStorage } from './todo.storage';

interface CreateTodoRequest {
  name: string;
}

interface UpdateTodoRequest {
  name: string;
  complete: boolean;
}

function makeTodoRouter(storage: TodoStorage): Router {
  const router = new Router({ prefix: '/todos' });

  router.get('/', async (ctx) => {
    const todos = await storage.findAll();
    return (ctx.body = todos);
  });

  router.post(
    '/',
    async (ctx: Context & { request: { body: CreateTodoRequest } }) => {
      const id = TodoIdGenerator.next();
      const body = ctx.request.body;
      if (!body || !body.name) return (ctx.status = 400);
      const todo: TodoRecord = {
        id,
        name: body.name,
        complete: false,
      };
      await storage.add(todo);
      ctx.status = 201;
      return (ctx.body = todo);
    }
  );

  router
    .param('id', async (id, ctx, next) => {
      ctx.todo = await storage.findById(id);
      if (!ctx.todo) return (ctx.status = 404);
      return next();
    })
    .get('/:id', (ctx) => {
      ctx.status = 200
      return (ctx.body = ctx.todo);
    })
    .put(
      '/:id',
      async (ctx: Context & { request: { body: UpdateTodoRequest } }) => {
        const body = ctx.request.body;
        const updatedTodo = {
          ...ctx.todo,
          name: body.name,
          complete: body.complete,
        };
        await storage.update(updatedTodo);
        return (ctx.status = 200);
      }
    )
    .delete('/:id', async (ctx) => {
      await storage.remove(ctx.todo.id);
      return (ctx.status = 200);
    });

  return router;
}

export { makeTodoRouter };
