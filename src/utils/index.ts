import * as filter from "../constants/filter";

const LSKEY = "react-hooks-todos-basic";

export const uuid = () => {
  return Date.now() + Math.floor(Math.random() * 50);
};

export const initialTodos: Todos = {
  countAll: 0,
  countCompleted: 0,
  editing: [],
  isSearching: false,
  isUpdating: false,
  payload: [],
  visibilityFilter: filter.ALL_TODOS,
  visible: [],
};

export const getStoredTodos = () => {
  const store = localStorage.getItem(LSKEY);
  return (store && JSON.parse(store)) || initialTodos;
};

export const setStoredTodos = (payload: Todos) => {
  return localStorage.setItem(LSKEY, JSON.stringify(payload));
};

export const updateTodos = (todos: Todos) => {
  const payloadState: Todo[] = [...todos.payload];
  const todosState: Todos = {
    ...todos,
    isUpdating: false,
    visible:
      todos.visibilityFilter === filter.ALL_TODOS
        ? payloadState
        : payloadState.filter((_todo) =>
            todos.visibilityFilter === filter.COMPLETED_TODOS
              ? _todo.completed
              : !_todo.completed
          ),
  };
  setStoredTodos(todosState);
  return todosState;
};
