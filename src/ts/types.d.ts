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
  isSearching: boolean;
  isUpdating: boolean;
  payload: Todo[];
  visibilityFilter: string;
  visible: Todo[];
  editing: Todo[];
};

type AddState = {
  title: string;
};

type AddTodo = (title: string) => void;
type DeleteTodo = (todo: Todo) => void;
type DeleteTodos = () => void;
type Dispatch = (arg: Action) => void;
type ChangeTodo = (todo: Todo) => void;
type ChangeTodos = (completed: boolean) => void;
type EditingTodo = (todo: Todo) => void;
type FilterTodos = (visibiltityFilter: string) => void;
type GetTodos = () => void;
type SaveTodoTitle = () => void;
type SearchToggle = () => void;
type SearchTodos = (searchTerm: string) => void;
type UndoEdit = () => void;
type UpdateTodos = () => void;

type Action =
  | { type: "ACTIVE_TODOS" }
  | { type: "ADD_TODO"; title: string }
  | { type: "ALL_TODOS" }
  | { type: "CHANGE_TODO_COMPLETED"; todo: Todo }
  | { type: "CHANGE_TODO_TITLE"; todo: Todo }
  | { type: "CHANGE_TODOS_COMPLETED"; isAllCompleted: boolean }
  | { type: "COMPLETED_TODOS" }
  | { type: "DELETE_TODO"; id: number }
  | { type: "DELETE_TODOS" }
  | { type: "EDITING_TODO"; todo: Todo }
  | { type: "GET_TODOS" }
  | { type: "SAVE_TODO" }
  | { type: "SET_FILTER"; visibiltityFilter: string }
  | { type: "SEARCH_TODOS"; searchTerm: string }
  | { type: "SEARCH_TOGGLE" }
  | { type: "UPDATE_TODOS" };
