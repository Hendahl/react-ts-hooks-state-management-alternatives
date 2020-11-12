export const FILTER_ACTIVE = "FILTER_ACTIVE";
export const FILTER_ALL = "FILTER_ALL";
export const FILTER_COMPLETED = "FILTER_COMPLETED";

export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const REMOVE_ALL = "REMOVE_ALL";
export const EDIT = "EDIT";
export const FILTER = "FILTER";
export const GET = "GET";
export const SAVE = "SAVE";
export const SEARCH = "SEARCH";
export const SHOW_EDIT = "SHOW_EDIT";
export const SHOW_SEARCH = "SHOW_SEARCH";
export const TOGGLE = "TOGGLE";
export const TOGGLE_ALL = "TOGGLE_ALL";
export const UPDATE = "UPDATE";

export type ActionTypes =
  | { type: typeof ADD; title: string }
  | { type: typeof REMOVE; id: number }
  | { type: typeof REMOVE_ALL }
  | { type: typeof EDIT; todo: TodoT }
  | { type: typeof FILTER; visibiltityFilter: string }
  | { type: typeof GET }
  | { type: typeof SAVE }
  | { type: typeof SEARCH; searchTerm: string }
  | { type: typeof SHOW_EDIT; todo: TodoT }
  | { type: typeof SHOW_SEARCH }
  | { type: typeof TOGGLE; todo: TodoT }
  | { type: typeof TOGGLE_ALL; isAllCompleted: boolean }
  | { type: typeof UPDATE };

export type AddTodo = (title: string) => void;
export type RemoveTodo = (todo: TodoT) => void;
export type RemoveTodos = () => void;
export type Dispatch = (arg: ActionTypes) => void;
export type EditTodo = (todo: TodoT) => void;
export type FilterTodos = (visibiltityFilter: string) => void;
export type GetTodos = () => void;
export type SaveTodo = () => void;
export type SearchTodos = (searchTerm: string) => void;
export type ShowEdit = (todo: TodoT) => void;
export type ShowSearch = () => void;
export type ToggleTodo = (todo: TodoT) => void;
export type ToggleTodos = (completed: boolean) => void;
export type UpdateTodos = () => void;

export type TodoT = {
  completed: boolean;
  id: number;
  title: string;
};

export type TodosT = {
  countAll: number;
  countCompleted: number;
  data: TodoT[];
  editing: TodoT[];
  isSearching: boolean;
  isUpdating: boolean;
  visibilityFilter: string;
  visibleTodos: TodoT[];
};

export interface TodosI {
  todos: TodosT;
}

export let initialTodos: TodosT = {
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
