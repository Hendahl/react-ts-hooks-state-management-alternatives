import * as t from "../ts/types";

export const getTodosApi = () => {
  const store = localStorage.getItem(t.LSKEY);
  return (store && JSON.parse(store)) || t.initialTodos;
};

export const setTodosApi = (data: t.TodosT) => {
  return localStorage.setItem(t.LSKEY, JSON.stringify(data));
};
