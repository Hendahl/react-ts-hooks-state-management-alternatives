export const FILTER_ACTIVE = "FILTER_ACTIVE";
export const FILTER_ALL = "FILTER_ALL";
export const FILTER_COMPLETED = "FILTER_COMPLETED";

export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const REMOVE_ALL = "REMOVE_ALL";
export const FILTER = "FILTER";
export const GET = "GET";
export const SEARCH = "SEARCH";
export const SHOW_SEARCH = "SHOW_SEARCH";
export const TOGGLE = "TOGGLE";
export const TOGGLE_ALL = "TOGGLE_ALL";
export const UPDATE = "UPDATE";

export type ActionTypes =
  | { type: typeof ADD; title: string }
  | { type: typeof REMOVE; id: number }
  | { type: typeof REMOVE_ALL }
  | { type: typeof FILTER; visibiltityFilter: string }
  | { type: typeof GET }
  | { type: typeof SEARCH; searchTerm: string }
  | { type: typeof SHOW_SEARCH }
  | { type: typeof TOGGLE; todo: TodoT }
  | { type: typeof TOGGLE_ALL; isAllCompleted: boolean }
  | { type: typeof UPDATE };

export type Add = (title: string) => void;
export type Remove = (todo: TodoT) => void;
export type RemoveAll = () => void;
export type Dispatch = (arg: ActionTypes) => void;
export type Filter = (visibiltityFilter: string) => void;
export type Get = () => void;
export type Search = (searchTerm: string) => void;
export type ShowSearch = () => void;
export type Toggle = (todo: TodoT) => void;
export type ToggleAll = (completed: boolean) => void;
export type UpdateAll = () => void;

export type TodoT = {
  completed: boolean;
  id: number;
  title: string;
};

export type TodosT = {
  countAll: number;
  countCompleted: number;
  data: TodoT[];
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
  isSearching: false,
  isUpdating: false,
  visibilityFilter: FILTER_ALL,
  visibleTodos: [],
};

export const LSKEY = "react-hooks-todos-all";
