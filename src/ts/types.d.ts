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

type ContextAction =
  | { type: "ADD_TODO"; title: string }
  | { type: "DELETE_TODO"; id: number }
  | { type: "DELETE_TODOS" }
  | { type: "EDIT_TODO"; todo: Todo }
  | { type: "FILTER_TODOS"; visibiltityFilter: string }
  | { type: "GET_TODOS" }
  | { type: "SAVE_TODO" }
  | { type: "SEARCH_TODOS"; searchTerm: string }
  | { type: "SHOW_EDIT"; todo: Todo }
  | { type: "SHOW_SEARCH" }
  | { type: "TOGGLE_TODO"; todo: Todo }
  | { type: "TOGGLE_TODOS"; isAllCompleted: boolean }
  | { type: "UPDATE_TODOS" };
