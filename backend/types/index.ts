export type Todo = {
  id: number;
  title: string;
  description: string;
};

export type TodoResponse = {
  status: string;
  statusCode: number;
  data: {
    todos: Todo[];
  };
};

export type TodoStatus = {
  status: string;
  statusCode: number;
  message: string;
};
