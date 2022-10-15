import * as supertest from 'supertest';
import { app } from '../src/app';
import { db } from '../src/db';

describe('/todos', () => {
  let server: ReturnType<typeof app.listen>;
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    await db('todos').truncate();
    server = app.listen();
    request = supertest(server);
  });

  afterAll(() => {
    server.close();
  });

  it('Manage todo successfully', async () => {
    // Create new todo
    const createTodoResponse = await request.post('/todos').send({
      name: 'New todo',
    });

    expect(createTodoResponse.status).toBe(201);
    expect(createTodoResponse.body).toMatchObject({
      id: expect.any(String),
      name: 'New todo',
      complete: false,
    });

    // Update todo
    const todo = createTodoResponse.body;
    const updateTodoResponse = await request.put('/todos/' + todo.id).send({
      ...todo,
      name: 'Updated todo',
      complete: true,
    });

    expect(updateTodoResponse.status).toBe(200);

    const getTodoResponse = await request.get('/todos/' + todo.id);

    expect(getTodoResponse.status).toBe(200);
    expect(getTodoResponse.body).toMatchObject({
      id: expect.any(String),
      name: 'Updated todo',
      complete: true,
    });

    // Delete todo
    const deleteTodoResponse = await request.delete('/todos/' + todo.id);

    expect(deleteTodoResponse.status).toBe(200);

    const getTodosResponse = await request.get('/todos');

    expect(getTodoResponse.status).toBe(200);
    expect(getTodosResponse.body.length).toEqual(0);
  });
});
