export type TodoType = {
  id: number;
  title: string;
  description: string;
};

export type TodoResponse = {
  status: string;
  statusCode: number;
  data: {
    todos: TodoType[];
  };
};

export type TodoStatus = {
  status: string;
  statusCode: number;
  message: string;
  data?: TodoType;
};
