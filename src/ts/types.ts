export const FILTER_ACTIVE = "FILTER_ACTIVE";
export const FILTER_ALL = "FILTER_ALL";
export const FILTER_COMPLETED = "FILTER_COMPLETED";

export const TODO_ADD = "TODO_ADD";
export const TODO_DELETE = "TODO_DELETE";
export const TODOS_DELETE = "TODOS_DELETE";
export const TODO_EDIT = "TODO_EDIT";
export const TODOS_FILTER = "TODOS_FILTER";
export const TODOS_GET = "TODOS_GET";
export const TODO_SAVE = "TODO_SAVE";
export const TODOS_SEARCH = "TODOS_SEARCH";
export const SHOW_EDIT = "SHOW_EDIT";
export const SHOW_SEARCH = "SHOW_SEARCH";
export const TODO_TOGGLE = "TODO_TOGGLE";
export const TODOS_TOGGLE = "TODOS_TOGGLE";
export const TODOS_UPDATE = "TODOS_UPDATE";

export type ActionTypes =
  | { type: typeof TODO_ADD; title: string }
  | { type: typeof TODO_DELETE; id: number }
  | { type: typeof TODOS_DELETE }
  | { type: typeof TODO_EDIT; todo: Todo }
  | { type: typeof TODOS_FILTER; visibiltityFilter: string }
  | { type: typeof TODOS_GET }
  | { type: typeof TODO_SAVE }
  | { type: typeof TODOS_SEARCH; searchTerm: string }
  | { type: typeof SHOW_EDIT; todo: Todo }
  | { type: typeof SHOW_SEARCH }
  | { type: typeof TODO_TOGGLE; todo: Todo }
  | { type: typeof TODOS_TOGGLE; isAllCompleted: boolean }
  | { type: typeof TODOS_UPDATE };

export type AddTodo = (title: string) => void;
export type DeleteTodo = (todo: Todo) => void;
export type DeleteTodos = () => void;
export type Dispatch = (arg: ActionTypes) => void;
export type EditTodo = (todo: Todo) => void;
export type FilterTodos = (visibiltityFilter: string) => void;
export type GetTodos = () => void;
export type SaveTodo = () => void;
export type SearchTodos = (searchTerm: string) => void;
export type ShowEdit = (todo: Todo) => void;
export type ShowSearch = () => void;
export type ToggleTodo = (todo: Todo) => void;
export type ToggleTodos = (completed: boolean) => void;
export type UpdateTodos = () => void;

export type Todo = {
  completed: boolean;
  id: number;
  title: string;
};

export type Todos = {
  countAll: number;
  countCompleted: number;
  data: Todo[];
  editing: Todo[];
  isSearching: boolean;
  isUpdating: boolean;
  visibilityFilter: string;
  visibleTodos: Todo[];
};

export interface TodosI {
  todos: Todos;
}

export let initialTodos: Todos = {
  countAll: 0,
  countCompleted: 0,
  data: [],
  editing: [],
  isSearching: false,
  isUpdating: false,
  visibilityFilter: FILTER_ALL,
  visibleTodos: [],
};

export const LSKEY = "react-hooks-todos-all";
