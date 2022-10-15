import { Knex } from 'knex';
import { TodoRecord, TODO_TABLE_NAME } from './todo.record';

interface TodoStorage {
  findAll(): Promise<TodoRecord[]>;
  findById(id: string): Promise<TodoRecord>;
  add(todo: TodoRecord): Promise<void>;
  update(todo: TodoRecord): Promise<void>;
  remove(id: string): Promise<void>;
}

function makeTodoStorage(db: Knex): TodoStorage {
  async function findAll() {
    return await db(TODO_TABLE_NAME).select('*');
  }

  async function findById(id: string) {
    return await db<TodoRecord>(TODO_TABLE_NAME)
      .select('*')
      .where('id', id)
      .first()
      .then((todo) => {
        todo.complete = Boolean(todo.complete);
        return todo
      });
  }

  async function add(todo: TodoRecord) {
    await db(TODO_TABLE_NAME).insert(todo);
  }

  async function update(todo: TodoRecord) {
    await db(TODO_TABLE_NAME).where('id', todo.id).update(todo);
  }

  async function remove(id: string) {
    await db(TODO_TABLE_NAME).where('id', id).delete();
  }

  return {
    findAll,
    findById,
    add,
    update,
    remove,
  };
}

export { makeTodoStorage, TodoStorage };
