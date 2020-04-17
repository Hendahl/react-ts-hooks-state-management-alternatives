type Classes = {
  listItem: string;
  listItemText: string;
  title: string;
  titleCompleted: string;
};

type Todo = {
  completed: boolean;
  id: number;
  title: string;
};

type Todos = {
  countAll: number;
  countCompleted: number;
  editing: Todo[];
  isUpdating: boolean;
  payload: Todo[];
  visibilityFilter: string;
  visible: Todo[];
};

type AddState = {
  title: string;
  isAllCompleted: boolean;
};

type AddTodo = (title: string) => void;
type ChangeTodo = (todo: Todo) => void;
type ChangeTodos = (completed: boolean) => void;
type DeleteTodo = (todo: Todo) => void;
type DeleteTodos = () => void;
type EditingTodo = (todo: Todo) => void;
type FilterTodos = (visibiltityFilter: string) => void;
type SaveTodoTitle = () => void;
type UndoEdit = () => void;
type UpdateTodos = () => void;
