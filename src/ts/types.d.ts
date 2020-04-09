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
  isUpdating: boolean;
  payload: Todo[];
  visibilityFilter: string;
  visible: Todo[];
  editing: Todo[];
};

type AddState = {
  isAllCompleted: boolean;
  title: string;
};
type EditState = {
  isEditing: boolean;
  title: string;
};

type AddTodo = (title: string) => void;
type DeleteTodo = (todo: Todo) => void;
type DeleteTodos = () => void;
type Dispatch = (arg0: Action) => void;
type ChangeTodo = (todo: Todo) => void;
type ChangeTodos = (completed: boolean) => void;
type EditingTodo = (todo: Todo) => void;
type FilterTodos = (visibiltityFilter: string) => void;
type GetTodos = () => void;
type SaveTodo = () => void;
type UpdateTodos = () => void;

type Action =
  | { type: "ACTIVE_TODOS" }
  | { type: "ADD_TODO"; title: string }
  | { type: "ALL_TODOS" }
  | { type: "CHANGE_TODO_COMPLETED"; todo: Todo }
  | { type: "CHANGE_TODO_TITLE"; todo: Todo }
  | { type: "COMPLETED_TODOS" }
  | { type: "DELETE_TODO"; id: number }
  | { type: "DELETE_TODOS" }
  | { type: "EDITING_TODO"; todo: Todo }
  | { type: "GET_TODOS" }
  | { type: "SAVE_TODO" }
  | { type: "SET_FILTER"; visibiltityFilter: string }
  | { type: "CHANGE_TODOS_COMPLETED"; isAllCompleted: boolean }
  | { type: "UPDATE_TODOS" };
