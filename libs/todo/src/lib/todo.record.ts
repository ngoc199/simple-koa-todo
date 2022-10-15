type Id = string;
type Name = string;
type Complete = boolean;

type TodoRecord = {
  id: Id;
  name: Name;
  complete: Complete;
};

const TODO_TABLE_NAME = 'todos';

export {TodoRecord, TODO_TABLE_NAME}
