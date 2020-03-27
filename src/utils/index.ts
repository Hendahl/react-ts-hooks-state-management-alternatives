/*
 * Note ! To keep basic functions togheter for this demo, we are using this utils.
 * For more less complex and recommended way - >
 * take a look in every specifik branch basic, redux, context, mobx
 */

import * as filter from "../constants/filter";

const LSKEY = "react-hooks-todos-all";

export const uuid = () => {
  return Date.now() + Math.floor(Math.random() * 50);
};

export const initialTodos: Todos = {
  countAll: 0,
  countCompleted: 0,
  payload: [],
  isUpdating: false,
  visibilityFilter: filter.ALL_TODOS,
  visible: []
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
  const todosState = {
    ...todos,
    isUpdating: false,
    visible:
      todos.visibilityFilter === filter.ALL_TODOS
        ? payloadState
        : payloadState.filter(_todo =>
            todos.visibilityFilter === filter.COMPLETED_TODOS
              ? _todo.completed
              : !_todo.completed
          )
  };
  setStoredTodos(todosState);
  return todosState;
};

export const deleteTodo = (todos: Todos, id: number) => {
  const payloadState = todos.payload.filter(_todo => _todo.id !== id);
  return {
    ...todos,
    countAll: --todos.countAll,
    countCompleted: payloadState.length,
    payload: payloadState.filter(_todo => _todo.id !== id),
    isUpdating: true
  };
};

export const deleteTodos = () => {
  setStoredTodos({
    ...initialTodos
  });
  return {
    ...initialTodos
  };
};

export const addTodo = (todos: Todos, title: string) => {
  const payloadState = [
    { id: uuid(), completed: false, title: title },
    ...todos.payload
  ];
  return {
    ...todos,
    countAll: todos.countAll + 1,
    payload: payloadState,
    visibilityFilter: filter.ALL_TODOS,
    isUpdating: true
  };
};

export const editTodo = (todos: Todos, id: number) => {
  const payloadState = todos.payload.map(_todo =>
    _todo.id === id ? { ..._todo, completed: !_todo.completed } : _todo
  );
  return {
    ...todos,
    countCompleted: payloadState.filter(_todo => _todo.completed).length,
    payload: payloadState,
    isUpdating: true
  };
};

export const editTodos = (todos: Todos, isAllCompleted: boolean) => {
  const payloadState = todos.payload.map(_todo =>
    _todo.completed === !isAllCompleted
      ? { ..._todo, completed: isAllCompleted }
      : _todo
  );
  return {
    ...todos,
    countCompleted: payloadState.filter(_todo => _todo.completed).length,
    payload: payloadState,
    isUpdating: true
  };
};

export const setFilter = (todos: Todos, visibilityFilter: string) => {
  return {
    ...todos,
    visibilityFilter: visibilityFilter,
    isUpdating: true
  };
};
