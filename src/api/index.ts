import * as t from "../ts/types";

/* FAKE SERVER -> Local storage */

export const getTodosApi = () => {
  const store = localStorage.getItem(t.LSKEY);
  return (store && JSON.parse(store)) || t.initialTodos;
};

export const setTodosApi = (data: t.TodosT) => {
  return localStorage.setItem(t.LSKEY, JSON.stringify(data));
};

export const getVisibleApi = (todos: any) => {
  const stateUpdated = {
    ...todos,
    isUpdating: false,
    visibleTodos:
      todos.visibilityFilter === t.FILTER_ALL
        ? todos.data
        : todos.data.filter((_todo: t.TodoT) =>
            todos.visibilityFilter === t.FILTER_COMPLETED
              ? _todo.isCompleted
              : !_todo.isCompleted
          ),
  };
  setTodosApi(stateUpdated);
  return stateUpdated;
};
